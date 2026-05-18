/**
 * Renders text with hover tooltips for any known glossary term.
 * Used on cocktail menu descriptions. Pure presentation - terms come from
 * src/data/cocktail-glossary.ts.
 *
 * Matching is case-insensitive, longest-first, non-overlapping.
 */
import { useEffect, useMemo, useState } from "react";
import { GLOSSARY_LOOKUP as COCKTAIL_LOOKUP } from "@/data/cocktail-glossary";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Segment = { kind: "text"; text: string }
  | { kind: "term"; text: string; blurb: string };

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export type GlossaryLookup = { match: string; entry: { blurb: string } }[];

// Cache segmentations per (lookup, text) so re-renders are free.
const segmentCache = new WeakMap<GlossaryLookup, Map<string, Segment[]>>();

function segmentCached(text: string, lookup: GlossaryLookup): Segment[] {
  let perLookup = segmentCache.get(lookup);
  if (!perLookup) {
    perLookup = new Map();
    segmentCache.set(lookup, perLookup);
  }
  const hit = perLookup.get(text);
  if (hit) return hit;
  const segs = segment(text, lookup);
  perLookup.set(text, segs);
  return segs;
}

function segment(text: string, lookup: GlossaryLookup): Segment[] {
  // Mark consumed character ranges so longer matches block shorter ones.
  const claimed = new Array(text.length).fill(false);
  const hits: { start: number; end: number; blurb: string }[] = [];

  for (const { match, entry } of lookup) {
    // Quick reject: case-insensitive substring presence before running regex.
    if (text.length < match.length) continue;
    if (!text.toLowerCase().includes(match.toLowerCase())) continue;
    const re = new RegExp(escapeRe(match), "gi");
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      const start = m.index;
      const end = start + m[0].length;
      let free = true;
      for (let i = start; i < end; i++) {
        if (claimed[i]) {
          free = false;
          break;
        }
      }
      if (!free) continue;
      for (let i = start; i < end; i++) claimed[i] = true;
      hits.push({ start, end, blurb: entry.blurb });
    }
  }

  hits.sort((a, b) => a.start - b.start);

  const out: Segment[] = [];
  let cursor = 0;
  for (const h of hits) {
    if (h.start > cursor) {
      out.push({ kind: "text", text: text.slice(cursor, h.start) });
    }
    out.push({ kind: "term", text: text.slice(h.start, h.end), blurb: h.blurb });
    cursor = h.end;
  }
  if (cursor < text.length) {
    out.push({ kind: "text", text: text.slice(cursor) });
  }
  return out;
}

export function GlossaryText({
  text,
  lookup = COCKTAIL_LOOKUP,
}: {
  text: string;
  lookup?: GlossaryLookup;
}) {
  const segs = useMemo(() => segmentCached(text, lookup), [text, lookup]);
  if (segs.every((s) => s.kind === "text")) return <>{text}</>;

  return (
    <>
      {segs.map((s, i) =>
        s.kind === "text" ? (
          <span key={i}>{s.text}</span>
        ) : (
          <GlossaryTerm key={i} text={s.text} blurb={s.blurb} />
        ),
      )}
    </>
  );
}

function GlossaryTerm({ text, blurb }: { text: string; blurb: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const timeout = window.setTimeout(() => setOpen(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline text-left text-foreground decoration-primary/40 decoration-dotted underline underline-offset-4 transition-colors hover:text-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        >
          {text}
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        collisionPadding={12}
        className="w-64 max-w-[min(16rem,calc(100vw-2rem))] border border-border bg-popover p-3 text-sm leading-snug text-popover-foreground shadow-md"
      >
        {blurb}
      </PopoverContent>
    </Popover>
  );
}
