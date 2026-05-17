/**
 * Stylized country map with clickable region pins.
 * Not a topographically accurate map — a schematic to help users browse
 * regions geographically. Coordinates live on each Region in 0..100 / 0..140.
 */
import type { Region, Country } from "@/data/education";

type ShapeProps = { fill: string; stroke: string };

function ItalyShape({ fill, stroke }: ShapeProps) {
  return (
    <>
      {/* Mainland silhouette (very stylized) */}
      <path
        d="M18,18 Q22,16 28,17 L40,18 Q48,17 55,22 L58,28 L52,32 L48,38 L46,46 L48,52 L52,58 L52,66 L56,72 L58,80 L54,86 L48,86 L44,80 L42,72 L38,64 L36,56 L34,50 L32,42 L28,38 L22,32 L18,26 Z"
        fill={fill} stroke={stroke} strokeWidth="0.6"
      />
      {/* Sardinia */}
      <ellipse cx="25" cy="64" rx="5" ry="7" fill={fill} stroke={stroke} strokeWidth="0.6" />
      {/* Sicily */}
      <path d="M36,86 L50,86 L48,92 L38,92 Z" fill={fill} stroke={stroke} strokeWidth="0.6" />
    </>
  );
}

function FranceShape({ fill, stroke }: ShapeProps) {
  return (
    <path
      d="M30,20 Q42,18 56,22 L66,28 L70,40 L66,52 L60,62 L52,72 L40,76 L28,74 L20,66 L18,54 L20,42 L24,30 Z"
      fill={fill} stroke={stroke} strokeWidth="0.6"
    />
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
  return (
    <svg viewBox="0 0 100 100" className="w-full h-auto max-h-[420px]" role="img" aria-label={`${country} wine regions map`}>
      {country === "Italy"
        ? <ItalyShape fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
        : <FranceShape fill="hsl(var(--muted))" stroke="hsl(var(--border))" />}

      {items.map((r) => {
        const active = r.id === selectedId;
        return (
          <g
            key={r.id}
            className="cursor-pointer"
            onClick={() => onSelect(r.id)}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(r.id); }}
          >
            <circle
              cx={r.x} cy={r.y}
              r={active ? 2.2 : 1.6}
              fill={active ? "hsl(var(--primary))" : "hsl(var(--foreground))"}
              stroke="hsl(var(--background))"
              strokeWidth="0.4"
            />
            <text
              x={r.x + 2.5} y={r.y + 1}
              fontSize="2.2"
              fill={active ? "hsl(var(--primary))" : "hsl(var(--foreground))"}
              className="pointer-events-none select-none"
              fontWeight={active ? 700 : 500}
            >
              {r.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}