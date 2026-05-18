/**
 * Renders text with hover tooltips for any known glossary term.
 * Used on cocktail menu descriptions. Pure presentation — terms come from
 * src/data/cocktail-glossary.ts.
 *
 * Matching is case-insensitive, longest-first, non-overlapping.
 */
import { GLOSSARY_LOOKUP as COCKTAIL_LOOKUP } from "@/data/cocktail-glossary";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Segment =
  | { kind: "text"; text: string }
  | { kind: "term"; text: string; blurb: string };

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export type GlossaryLookup = { match: string; entry: { blurb: string } }[];

function segment(text: string, lookup: GlossaryLookup): Segment[] {
  // Mark consumed character ranges so longer matches block shorter ones.
  const claimed = new Array(text.length).fill(false);
  const hits: { start: number; end: number; blurb: string }[] = [];

  for (const { match, entry } of lookup) {
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
  const segs = segment(text, lookup);
  if (segs.every((s) => s.kind === "text")) return <>{text}</>;

  return (
    <TooltipProvider delayDuration={120}>
      {segs.map((s, i) =>
        s.kind === "text" ? (
          <span key={i}>{s.text}</span>
        ) : (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <span
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                className="cursor-help text-foreground decoration-primary/40 decoration-dotted underline-offset-4 transition-colors hover:underline focus:underline focus:outline-none"
              >
                {s.text}
              </span>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="max-w-xs border border-border bg-popover text-popover-foreground shadow-md"
            >
              {s.blurb}
            </TooltipContent>
          </Tooltip>
        ),
      )}
    </TooltipProvider>
  );
}
