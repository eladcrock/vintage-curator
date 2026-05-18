/**
 * Stylized country map with clickable region pins.
 * Not a topographically accurate map - a schematic to help users browse
 * regions geographically. Coordinates live on each Region in 0..100 / 0..140.
 */
import type { Region, Country } from "@/data/education";
import { zoneColor } from "@/lib/education";
import { useEffect, useRef, useState } from "react";

type ShapeProps = { fill: string; stroke: string };

function ItalyShape({ fill, stroke }: ShapeProps) {
  return (
    <>
      {/*
        Mainland boot tuned to the (0..100, 0..100) viewBox used by region
        coords, traced from a real map of Italy. Alpine arc up top, Po
        valley below, body running SE down the Apennine spine, Gargano
        spur, heel of Puglia jutting east, concave Gulf of Taranto, and a
        clear toe of Calabria above the Strait of Messina.
      */}
      <path
        d="
          M 12,22
          C 14,16 22,14 30,15
          C 36,13 44,14 50,16
          C 58,15 66,17 70,22
          C 72,26 68,30 62,29
          L 54,30
          C 50,32 50,36 52,40
          C 54,44 56,48 56,52
          L 56,56
          C 58,58 60,58 62,58
          C 64,58 66,60 66,63
          C 66,67 62,69 58,68
          L 54,67
          C 52,67 50,66 48,67
          C 46,69 45,73 46,76
          C 47,79 44,79 43,76
          L 42,72
          C 41,69 39,67 37,66
          C 35,68 35,72 36,75
          C 37,78 35,80 34,77
          L 33,72
          C 32,68 30,64 28,60
          L 26,53
          C 24,46 21,40 17,34
          L 14,28
          C 12,25 11,23 12,22
          Z
        "
        fill={fill} stroke={stroke} strokeWidth="0.6" strokeLinejoin="round"
      />
      {/* Sardinia - large oblong island west of the mainland, pin (25,64) */}
      <path
        d="M 24,54 C 18,55 15,60 16,66 C 16,72 18,76 22,77 C 27,78 31,74 32,68 C 33,62 32,57 28,55 C 27,54 25,54 24,54 Z"
        fill={fill} stroke={stroke} strokeWidth="0.6"
      />
      {/* Corsica hint (French) - small, faded, clearly above Sardinia */}
      <path
        d="M 23,45 C 20,46 18,49 19,52 C 20,53 24,53 25,51 C 26,48 26,45 23,45 Z"
        fill={fill} stroke={stroke} strokeWidth="0.4" opacity="0.45"
      />
      {/*
        Sicily - the Trinacria. Triangular island with three corners:
        Trapani (NW, x~30), Messina (NE near the toe, x~54), and
        Capo Passero (SE, x~50). Pin at (44,94).
      */}
      <path
        d="M 30,92 L 56,90 L 50,99 Z"
        fill={fill} stroke={stroke} strokeWidth="0.6" strokeLinejoin="round"
      />

      {/* ===== Topography labels (italic, low contrast so pins stay primary) ===== */}
      <g
        fill="oklch(0.45 0.07 235)"
        fontStyle="italic"
        fontWeight={500}
        className="pointer-events-none select-none"
      >
        {/* Mountains */}
        <text x="32" y="13" fontSize="2.6" letterSpacing="0.3">ALPS</text>
        <text
          x="44" y="48" fontSize="2.2" letterSpacing="0.3"
          transform="rotate(58 44 48)"
          fill="oklch(0.45 0.05 60)"
        >APENNINES</text>
        {/* Plain */}
        <text x="34" y="24" fontSize="1.8" opacity="0.75">Po Valley</text>
        {/* Seas */}
        <text x="3"  y="50" fontSize="2.2">Tyrrhenian</text>
        <text x="6"  y="53.5" fontSize="2.2">Sea</text>
        <text x="72" y="40" fontSize="2.2">Adriatic</text>
        <text x="74" y="43.5" fontSize="2.2">Sea</text>
        <text x="74" y="74" fontSize="2.2">Ionian</text>
        <text x="76" y="77.5" fontSize="2.2">Sea</text>
        <text x="3"  y="80" fontSize="2" opacity="0.85">Mediterranean</text>
        {/* Strait */}
        <text x="32" y="87" fontSize="1.6" opacity="0.85">Strait of Messina</text>
      </g>
    </>
  );
}

function FranceShape({ fill, stroke }: ShapeProps) {
  return (
    <>
      {/*
        France - the classic Hexagone, traced from a real map. Channel
        coast top with the Cotentin bump, Brittany peninsula jutting clearly
        west, Atlantic / Bay of Biscay on the west, flat Pyrenees across
        the south, Mediterranean SE, Alps and Rhine on the east.
      */}
      <path
        d="
          M 28,18
          C 36,15 46,14 54,15
          C 60,16 64,19 66,22
          L 69,27
          C 71,32 71,37 69,42
          L 70,48
          C 70,52 68,56 64,58
          L 58,62
          C 52,65 46,67 40,67
          L 32,68
          C 28,68 26,65 28,61
          C 28,58 26,55 25,52
          L 24,46
          C 22,42 20,39 18,36
          L 22,34
          C 24,30 26,26 28,22
          Z
        "
        fill={fill} stroke={stroke} strokeWidth="0.6" strokeLinejoin="round"
      />
      {/* Brittany peninsula - jutting clearly west off the NW coast */}
      <path
        d="M 22,32 C 16,32 10,33 6,35 C 4,36 4,38 7,39 C 12,40 18,39 22,38 C 24,37 24,33 22,32 Z"
        fill={fill} stroke={stroke} strokeWidth="0.5" strokeLinejoin="round"
      />
      {/* Cotentin peninsula - the small Normandy thumb on the Channel coast */}
      <path
        d="M 30,18 C 30,14 33,13 34,15 C 35,17 34,19 33,20 C 31,21 30,20 30,18 Z"
        fill={fill} stroke={stroke} strokeWidth="0.4"
      />
      {/* Corsica - separate island in the Mediterranean SE */}
      <path
        d="M 66,66 C 63,66 61,69 62,72 C 63,75 66,76 68,73 C 70,70 69,66 66,66 Z"
        fill={fill} stroke={stroke} strokeWidth="0.5"
      />

      {/* ===== Topography labels ===== */}
      <g
        fill="oklch(0.45 0.07 235)"
        fontStyle="italic"
        fontWeight={500}
        className="pointer-events-none select-none"
      >
        {/* Water bodies */}
        <text x="36" y="12" fontSize="1.8">English Channel</text>
        <text x="6"  y="50" fontSize="1.8">Bay of</text>
        <text x="6"  y="53" fontSize="1.8">Biscay</text>
        <text x="44" y="71" fontSize="1.8">Mediterranean Sea</text>
        {/* Mountains */}
        <text
          x="62" y="44" fontSize="1.8" letterSpacing="0.2"
          fill="oklch(0.45 0.05 60)"
        >ALPS</text>
        <text
          x="30" y="67" fontSize="1.8" letterSpacing="0.2"
          fill="oklch(0.45 0.05 60)"
        >PYRENEES</text>
        <text
          x="42" y="48" fontSize="1.6" letterSpacing="0.2"
          fill="oklch(0.50 0.04 60)" opacity="0.85"
        >Massif Central</text>
        {/* Rivers (hint labels - no drawn river paths) */}
        <text x="58" y="34" fontSize="1.4" opacity="0.7">Rhine</text>
        <text x="56" y="52" fontSize="1.4" opacity="0.7">Rhône</text>
      </g>
    </>
  );
}

export function RegionMap({
  country,
  regions,
  selectedId,
  onSelect,
}: {
  country: Country;
  regions: Region[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const items = regions.filter((r) => r.country === country);

  // Default viewBox per country - France is small/clustered, so we crop in.
  const DEFAULTS: Record<Country, { x: number; y: number; w: number; h: number }> = {
    Italy:  { x: 10, y: 10, w: 80, h: 90 },
    France: { x: 14, y: 14, w: 60, h: 60 },
  };

  const [vb, setVb] = useState(DEFAULTS[country]);
  const dragRef = useRef<{ x: number; y: number; vb: typeof vb } | null>(null);
  const movedRef = useRef(false);

  useEffect(() => { setVb(DEFAULTS[country]); /* reset on country switch */ // eslint-disable-next-line
  }, [country]);

  // Zoom level as a percentage of "fit" (default viewBox = 100%).
  const defaultW = DEFAULTS[country].w;
  const zoomPct = Math.round((defaultW / vb.w) * 100);

  const zoom = (factor: number) => {
    setVb((cur) => {
      const nw = Math.max(15, Math.min(100, cur.w * factor));
      const nh = Math.max(15, Math.min(100, cur.h * factor));
      const cx = cur.x + cur.w / 2;
      const cy = cur.y + cur.h / 2;
      return { x: cx - nw / 2, y: cy - nh / 2, w: nw, h: nh };
    });
  };
  const reset = () => setVb(DEFAULTS[country]);

  return (
    <div className="relative overflow-hidden rounded-xl ring-1 ring-border/60 shadow-sm">
      {/* Map canvas */}
      <svg
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        className="block w-full h-auto max-h-[60vh] sm:max-h-[420px] select-none cursor-grab active:cursor-grabbing touch-pan-y"
        role="img"
        aria-label={`${country} wine regions map`}
        onWheel={(e) => {
          // Elegant pattern (Google Maps / Figma): only zoom when the user
          // explicitly opts in with a modifier - otherwise let the page scroll.
          if (!(e.ctrlKey || e.metaKey)) return;
          e.preventDefault();
          zoom(e.deltaY > 0 ? 1.15 : 0.87);
        }}
        onPointerDown={(e) => {
          (e.target as Element).setPointerCapture?.(e.pointerId);
          dragRef.current = { x: e.clientX, y: e.clientY, vb };
          movedRef.current = false;
        }}
        onPointerMove={(e) => {
          if (!dragRef.current) return;
          if (Math.abs(e.clientX - dragRef.current.x) + Math.abs(e.clientY - dragRef.current.y) > 4) {
            movedRef.current = true;
          }
          const svg = e.currentTarget;
          const rect = svg.getBoundingClientRect();
          const scaleX = dragRef.current.vb.w / rect.width;
          const scaleY = dragRef.current.vb.h / rect.height;
          const dx = (e.clientX - dragRef.current.x) * scaleX;
          const dy = (e.clientY - dragRef.current.y) * scaleY;
          setVb({ ...dragRef.current.vb, x: dragRef.current.vb.x - dx, y: dragRef.current.vb.y - dy });
        }}
        onPointerUp={() => { dragRef.current = null; }}
        onPointerLeave={() => { dragRef.current = null; }}
      >
        <defs>
          {/* Subtle sea gradient */}
          <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="oklch(0.98 0.012 230)" />
            <stop offset="100%" stopColor="oklch(0.94 0.022 230)" />
          </linearGradient>
          {/* Soft inner vignette for depth */}
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="60%" stopColor="oklch(0 0 0 / 0)" />
            <stop offset="100%" stopColor="oklch(0 0 0 / 0.12)" />
          </radialGradient>
          {/* Pin drop shadow */}
          <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0.3" stdDeviation="0.4" floodOpacity="0.35" />
          </filter>
        </defs>

      {/* Sea / canvas - always bright so labels read in light & dark mode */}
        <rect x="-10" y="-10" width="120" height="120" fill="url(#seaGrad)" />
      {country === "Italy"
        ? <ItalyShape fill="oklch(0.985 0.01 95)" stroke="oklch(0.30 0.05 250)" />
        : <FranceShape fill="oklch(0.985 0.01 95)" stroke="oklch(0.30 0.05 250)" />}

      {items.map((r) => {
        const active = r.id === selectedId;
        const color = zoneColor(r.zone);
        // Font scales inverse to zoom so labels stay legible.
        const fontSize = Math.max(1.4, Math.min(3.6, vb.w * 0.028));
        const radius = Math.max(1.0, Math.min(2.8, vb.w * 0.022));
        return (
          <g
            key={r.id}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              // Suppress click if user was panning the map.
              if (movedRef.current) { movedRef.current = false; return; }
              onSelect(r.id);
            }}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(r.id); }}
          >
            {/* Outer ring for active pin */}
            {active && (
              <circle cx={r.x} cy={r.y} r={radius * 2.2}
                fill="none" stroke={color} strokeWidth={fontSize * 0.10} opacity="0.35" />
            )}
            <circle
              cx={r.x} cy={r.y}
              r={active ? radius * 1.4 : radius}
              fill={color}
              stroke={active ? "oklch(0.15 0 0)" : "oklch(1 0 0)"}
              strokeWidth={active ? fontSize * 0.18 : fontSize * 0.11}
              filter="url(#pinShadow)"
            />
            <text
              x={r.x + radius + 0.6} y={r.y + fontSize * 0.35}
              fontSize={fontSize}
              fill="oklch(0.15 0 0)"
              stroke="oklch(1 0 0)"
              strokeWidth={fontSize * 0.22}
              paintOrder="stroke"
              className="pointer-events-none select-none"
              fontWeight={active ? 700 : 500}
            >
              {r.name}
            </text>
          </g>
        );
      })}

        {/* Vignette on top of land */}
        <rect x="0" y="0" width="100" height="100" fill="url(#vignette)" pointerEvents="none" />
      </svg>

      {/* Top-left: country + zoom badge */}
      <div className="pointer-events-none absolute left-2 top-2 flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground/80 backdrop-blur ring-1 ring-border/60 shadow-sm">
        <span aria-hidden>🍷</span>
        <span>{country}</span>
        <span className="text-muted-foreground">· {zoomPct}%</span>
      </div>

      {/* Bottom-right: unified zoom pill */}
      <div className="absolute bottom-3 right-3 flex items-center divide-x divide-border/60 overflow-hidden rounded-full bg-background/90 ring-1 ring-border/60 shadow-md backdrop-blur">
        <button
          type="button" onClick={() => zoom(0.8)} aria-label="Zoom in"
          className="flex h-8 w-9 items-center justify-center text-sm font-semibold text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
        >＋</button>
        <button
          type="button" onClick={() => zoom(1.25)} aria-label="Zoom out"
          className="flex h-8 w-9 items-center justify-center text-sm font-semibold text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
        >－</button>
        <button
          type="button" onClick={reset} aria-label="Reset view"
          className="flex h-8 px-2.5 items-center justify-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >Reset</button>
      </div>

      {/* Bottom-left hint */}
      <div className="pointer-events-none absolute bottom-3 left-3 hidden sm:block rounded-full bg-background/70 px-2.5 py-1 text-[10px] text-muted-foreground backdrop-blur ring-1 ring-border/40">
        drag to pan · ⌘/Ctrl + scroll to zoom
      </div>
    </div>
  );
}