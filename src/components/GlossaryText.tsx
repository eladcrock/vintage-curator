/**
 * Renders text with hover tooltips for any known glossary term.
 * Used on cocktail menu descriptions. Pure presentation — terms come from
 * src/data/cocktail-glossary.ts.
 *
 * Matching is case-insensitive, longest-first, non-overlapping.
 */
import { GLOSSARY_LOOKUP } from "@/data/cocktail-glossary";
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

function segment(text: string): Segment[] {
  // Mark consumed character ranges so longer matches block shorter ones.
  const claimed = new Array(text.length).fill(false);
  const hits: { start: number; end: number; blurb: string }[] = [];

  for (const { match, entry } of GLOSSARY_LOOKUP) {
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

export function GlossaryText({ text }: { text: string }) {
  const segs = segment(text);
  if (segs.every((s) => s.kind === "text")) return <>{text}</>;

  return (
    <TooltipProvider delayDuration={120}>
      {segs.map((s, i) =>
        s.kind === "text" ? (
          <span key={i}>{s.text}</span>
        ) : (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="cursor-help rounded-sm bg-primary/10 px-0.5 text-foreground underline decoration-primary/50 decoration-dotted underline-offset-2 transition-colors hover:bg-primary/20"
              >
                {s.text}
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="max-w-xs bg-popover text-popover-foreground border border-border shadow-md"
            >
              {s.blurb}
            </TooltipContent>
          </Tooltip>
        ),
      )}
    </TooltipProvider>
  );
}
