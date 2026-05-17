"""Parse Bottega wine list markdown into structured JSON."""
import re, json, sys, os

SRC = sys.argv[1] if len(sys.argv) > 1 else '/tmp/list.md'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'src/data/wines.json'

WINE_TYPES = {'SPARKLING':'Sparkling','CHAMPAGNE':'Sparkling','WHITE':'White','RED':'Red',
              'ROSE':'Rosé','ROSÉ':'Rosé','DESSERT':'Dessert','SWEET':'Dessert','ORANGE':'Orange'}
COUNTRIES = {'UNITED STATES':'United States','USA':'United States','US':'United States',
             'ITALY':'Italy','ITALIAN':'Italy','FRANCE':'France','AUSTRALIA':'Australia'}
SKIP_HEADERS = {'TABLE OF CONTENTS','FROM THE BAR','SPECIALTY COCKTAILS','ZERO PROOF COCKTAILS',
                'BEER','SPIRITS','VODKA','GIN','RUM','AGAVE','WHISKEY','AMARI','AMARI & ETC.',
                'AMARI ETC.','RARE & LIMITED SPIRITS','BOTTEGA','RARE RARE & LIMITED SPIRITS'}
SUBTYPE_TOKENS = {'NON-ALCOHOLIC','MULTI-VINTAGE','VINTAGE','BLANC DE BLANCS','BLANC DE NOIRS',
                  'MULTI-VINTAGE – ROSE','VINTAGE – ROSE','MULTI-VINTAGE – BLANC DE BLANCS',
                  'VINTAGE – BLANC DE BLANCS','MULTI-VINTAGE – BLANC DE NOIRS','PROPRIETARY'}

def title(s):
    if not s: return s
    # preserve apostrophes and accents; smart title
    parts = s.split()
    out = []
    for p in parts:
        if p.upper() in ('USA','BTG','MV','NV','AVA','DOC','DOCG','IGT'):
            out.append(p.upper())
        elif "'" in p:
            a,b = p.split("'",1)
            out.append(a.capitalize()+"'"+b.lower())
        else:
            out.append(p.capitalize())
    return ' '.join(out)

def clean(s):
    s = re.sub(r'<[^>]+>', '', s); s = re.sub(r'\*+', '', s)
    s = s.replace('&amp;','&').replace('&#x2019;',"'").replace('&#x201C;','"').replace('&#x201D;','"')
    s = re.sub(r'\s+', ' ', s).strip()
    s = s.rstrip(',').strip()
    return s

def parse_year(tok):
    t = tok.strip().upper()
    if t in ('NV','MV'): return t
    if re.fullmatch(r'(19|20)\d{2}', t): return int(t)
    return None

def parse_price(s):
    m = re.search(r'\$\s*([\d,]+)', s)
    return int(m.group(1).replace(',','')) if m else None

SIZE_RE = re.compile(r'\b(\d+(?:\.\d+)?L|750mL|375mL|500mL|2oz)\b', re.I)

def extract_size(s):
    m = SIZE_RE.search(s)
    if not m: return s, None
    sz = m.group(1)
    s2 = (s[:m.start()] + s[m.end():]).strip().rstrip(',').strip()
    return s2, sz

# inline row: "CODE YEAR ...rest... $price"
INLINE_RE = re.compile(
    r'^(?P<code>BTG|WI|Cellar|BOD-\d+|BOD\d+|[A-Z]{1,3}\d+|[A-Z]{2,4})\s+'
    r'(?P<year>NV|MV|\d{4})\s+(?P<rest>.+?)\s*\$(?P<price>[\d,]+)\s*$'
)
# BTG inline (no code): "YEAR producer, ..., region $price"
BTG_INLINE_RE = re.compile(r'^(?P<year>NV|MV|\d{4})\s+(?P<rest>.+?)\s*\$(?P<price>[\d,]+)\s*$')

def parse_header(level, text, state):
    T = clean(text).upper()
    if T in SKIP_HEADERS:
        if T in ('SPIRITS','VODKA','GIN','RUM','AGAVE','WHISKEY','AMARI','AMARI & ETC.',
                 'AMARI ETC.','RARE & LIMITED SPIRITS','RARE RARE & LIMITED SPIRITS'):
            state['in_spirits'] = True
        state['varietal_hint'] = None
        state['region_hint'] = None
        return
    if 'WINES BY THE GLASS' in T:
        state.update(btg=True, large=False, section_type=None, section_country=None,
                     varietal_hint=None, region_hint=None)
        return
    if 'LARGE FORMAT' in T:
        state.update(btg=False, large=True, varietal_hint=None, region_hint=None)
        for p in re.split(r'[–\-]', T):
            p = p.strip()
            if p in WINE_TYPES: state['section_type'] = WINE_TYPES[p]
        return
    if 'CORKAGE' in T: return

    parts = [p.strip() for p in re.split(r'[–\-]', T) if p.strip()]

    if level <= 2:
        found_country = None; found_type = None
        for p in parts:
            if p in COUNTRIES: found_country = COUNTRIES[p]
            if p in WINE_TYPES: found_type = WINE_TYPES[p]
        if 'DESSERT WINE' in T or T == 'DESSERT WINES':
            state['section_type'] = 'Dessert'
            state['btg'] = False; state['large'] = False
            state['varietal_hint'] = None; state['region_hint'] = None
            return
        if (found_country or found_type) and not state.get('btg'):
            state['btg'] = False
            # leave large_format flag based on existing
            if found_country: state['section_country'] = found_country
            if found_type: state['section_type'] = found_type
            state['large'] = False
            state['varietal_hint'] = None; state['region_hint'] = None
            return
        if state.get('btg') and found_type:
            state['section_type'] = found_type
            state['varietal_hint'] = None; state['region_hint'] = None
            return
        # standalone WHITE/RED etc.
        for p in parts:
            if p in WINE_TYPES:
                state['section_type'] = WINE_TYPES[p]
                state['large'] = False
                state['varietal_hint'] = None; state['region_hint'] = None
                return

    # H3+: varietal/region hint
    if any(t == T or T.startswith(t) for t in SUBTYPE_TOKENS):
        # ignore subtype hints but if has ROSE flip type
        if 'ROSE' in T or 'ROSÉ' in T:
            state['section_type'] = state.get('section_type') or 'Sparkling'
        return
    if T in COUNTRIES:
        state['section_country'] = COUNTRIES[T]
        return
    # try varietal – region
    if len(parts) >= 2:
        state['varietal_hint'] = title(parts[0])
        state['region_hint'] = title(' – '.join(parts[1:]))
    else:
        # single: treat as region hint at level 4+, varietal at level 3
        if level >= 4:
            state['region_hint'] = title(parts[0])
        else:
            # could be varietal or region (e.g. PIEDMONT, CAMPANIA)
            state['region_hint'] = title(parts[0])

def add_wine(state, code, year, rest_text, price, size=None):
    if state.get('in_spirits'): return
    if not state.get('section_type') and not state.get('btg'): return
    rest_text, sz2 = extract_size(rest_text)
    if size is None: size = sz2
    rest_text = clean(rest_text)
    # split producer / cuvee / varietal / region by commas
    fields = [clean(x) for x in rest_text.split(',') if clean(x)]
    producer = fields[0] if fields else ''
    # heuristic: last field is region if it contains known place-y words; else use region_hint
    region = state.get('region_hint')
    varietal = state.get('varietal_hint')
    cuvee_parts = []
    if len(fields) >= 2:
        if len(fields) == 2 and state.get('varietal_hint') and state.get('region_hint'):
            cuvee_parts = [fields[1]]
            middle = []
            region = state.get('region_hint')
        else:
            # Last field likely region
            region = fields[-1]
            middle = fields[1:-1]
        # if there are 2 middle fields, second-to-last might be varietal
        if middle:
            # varietal heuristic: contains grape keyword
            grape_kws = ('Cabernet','Chardonnay','Pinot','Sauvignon','Merlot','Sangiovese','Nebbiolo',
                         'Syrah','Shiraz','Zinfandel','Riesling','Carricante','Falanghina','Cortese',
                         'Greco','Fiano','Bianco','Noir','Grigio','Gris','Bordeaux','Blend','Barbera',
                         'Bonarda','Pecorino','Pinot Bianco','Pinot Nero','Lambrusco','Moscato','Brut',
                         'Champagne','Prosecco','Franciacorta','Aglianico','Montepulciano')
            for i, m in enumerate(middle):
                if any(k.lower() in m.lower() for k in grape_kws):
                    varietal = m
                    cuvee_parts = middle[:i] + middle[i+1:]
                    break
            else:
                cuvee_parts = middle
    cuvee = ', '.join(cuvee_parts) if cuvee_parts else None

    # year
    y = parse_year(str(year))
    vintage = y if isinstance(y, int) else 'NV'

    # type
    wtype = state.get('section_type') or 'Other'
    # BTG by-the-glass section: subsection determines type
    if state.get('btg'):
        wtype = state.get('section_type') or wtype

    # price: BTG = priceGlass, else priceBottle
    pg = price if state.get('btg') else None
    pb = price if not state.get('btg') else None

    # country fallback
    country = state.get('section_country')
    if not country and region:
        r = region.lower()
        if any(x in r for x in ('napa','sonoma','california','oregon','washington','rutherford','oakville','carneros','santa','russian river','mendocino','willamette','walla walla','st. helena','knights valley','howell mountain','spring mountain','pritchard','stag','yountville','calistoga','coast','north coast','anderson valley','san benito')):
            country = 'United States'
        elif any(x in r for x in ('tuscany','piedmont','sicily','lombardy','veneto','campania','friuli','emilia','alto adige','umbria','barolo','barbaresco','chianti','brunello','etna','valdobbiadene','prosecco','franciacorta','gavi','oltrepo','asti','marche','sardinia','basilicata','puglia','abruzzo','trento','d\'alba','d\'asti','montalcino','montepulciano','bolgheri')):
            country = 'Italy'
        elif any(x in r for x in ('burgundy','bordeaux','champagne','rhone','loire','provence','beaune','reims','epernay','graves','mesnil','mareuil','ay','cumieres','marne','bouzy','ambonnay','avize','verzenay','verzy','tours-sur','chambolle','gevrey','vosne','volnay','meursault','puligny','chassagne','pommard','sancerre','chablis','barsac','sauternes','margaux','pauillac','st-julien','saint-julien','saint-emilion','pomerol','st-estephe','medoc','cote','rully')):
            country = 'France'

    state['wines'].append({
        'id': len(state['wines']) + 1,
        'code': code,
        'vintage': vintage,
        'producer': producer,
        'cuvee': cuvee,
        'varietal': varietal,
        'region': region,
        'country': country,
        'type': wtype,
        'priceGlass': pg,
        'priceBottle': pb,
        'size': size if size else ('750mL' if not state.get('btg') else None),
        'byTheGlass': bool(state.get('btg')),
        'largeFormat': bool(size and size.upper() not in ('750ML','375ML','500ML')) or bool(state.get('large')),
    })

def main():
    text = open(SRC).read()
    # normalize entities outside the htmls
    lines = text.splitlines()
    state = dict(btg=False, large=False, section_type=None, section_country=None,
                 varietal_hint=None, region_hint=None, in_spirits=False, wines=[])

    i = 0
    while i < len(lines):
        line = lines[i]
        raw = line.rstrip()
        # headers
        m = re.match(r'^(#{1,6})\s+(.+?)\s*$', raw)
        if m:
            parse_header(len(m.group(1)), m.group(2), state)
            i += 1; continue
        # table
        if raw.strip().startswith('<table>'):
            # collect until </table>
            rows = []
            i += 1
            while i < len(lines) and '</table>' not in lines[i]:
                # detect <tr> blocks
                if '<tr>' in lines[i]:
                    cells = []
                    j = i + 1
                    while j < len(lines) and '</tr>' not in lines[j]:
                        cm = re.search(r'<(?:td|th)[^>]*>(.*?)</(?:td|th)>', lines[j])
                        if cm:
                            cells.append(clean(cm.group(1)))
                        j += 1
                    rows.append(cells)
                    i = j
                i += 1
            # rows[0] may be header — skip if contains 'Year' or 'Wine'
            data_rows = rows
            if rows and any(h.lower() in ('year','wine name','wine name & details','code','cellar','price','size') for h in rows[0]):
                data_rows = rows[1:]
            for cells in data_rows:
                if len(cells) < 3: continue
                # find year cell
                year_idx = None
                for k, c in enumerate(cells):
                    if parse_year(c) is not None:
                        year_idx = k; break
                if year_idx is None: continue
                code = cells[year_idx-1] if year_idx > 0 else None
                year = cells[year_idx]
                # price = last cell with $
                price = None; price_idx = None
                for k in range(len(cells)-1, year_idx, -1):
                    p = parse_price(cells[k])
                    if p is not None:
                        price = p; price_idx = k; break
                if price is None: continue
                # size: cell between name and price that matches SIZE_RE
                size = None
                end_name = price_idx
                if price_idx - 1 > year_idx:
                    cand = cells[price_idx - 1]
                    sm = SIZE_RE.fullmatch(cand) or SIZE_RE.search(cand)
                    if sm and len(cand) <= 8:
                        size = cand
                        end_name = price_idx - 1
                # name parts between year+1 and end_name
                name = ', '.join([c for c in cells[year_idx+1:end_name] if c])
                add_wine(state, code, year, name, price, size)
            i += 1; continue
        # inline content row?
        stripped = raw.strip()
        if not stripped:
            i += 1; continue
        m = INLINE_RE.match(stripped)
        if m:
            code = m.group('code')
            year = m.group('year')
            rest = m.group('rest')
            price = int(m.group('price').replace(',',''))
            rest, sz = extract_size(rest)
            add_wine(state, code, year, rest, price, sz)
            i += 1; continue
        if state.get('btg'):
            m2 = BTG_INLINE_RE.match(stripped)
            if m2:
                year = m2.group('year'); rest = m2.group('rest')
                price = int(m2.group('price').replace(',',''))
                add_wine(state, None, year, rest, price, None)
                i += 1; continue
        i += 1

    # post-process: sanity, drop spirits-like (low-priced single-name entries with no comma in beer/spirits range)
    wines = state['wines']
    # Filter: must have producer
    wines = [w for w in wines if w['producer'] and len(w['producer']) > 1]
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, 'w') as f:
        json.dump(wines, f, indent=2, ensure_ascii=False)
    print(f"Wrote {len(wines)} wines to {OUT}")
    # stats
    from collections import Counter
    tc = Counter(w['type'] for w in wines)
    cc = Counter(w['country'] for w in wines)
    print('Types:', dict(tc))
    print('Countries:', dict(cc))
    print('BTG:', sum(1 for w in wines if w['byTheGlass']))
    print('Vintages with NV:', sum(1 for w in wines if w['vintage']=='NV'))

main()
