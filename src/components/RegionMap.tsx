/**
 * Stylized country map with clickable region pins.
 * Not a topographically accurate map — a schematic to help users browse
 * regions geographically. Coordinates live on each Region in 0..100 / 0..140.
 */
import type { Region, Country } from "@/data/education";
import { zoneColor } from "@/lib/education";
import { useEffect, useRef, useState } from "react";

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

  // Default viewBox per country — France is small/clustered, so we crop in.
  const DEFAULTS: Record<Country, { x: number; y: number; w: number; h: number }> = {
    Italy:  { x: 10, y: 10, w: 80, h: 90 },
    France: { x: 14, y: 14, w: 60, h: 60 },
  };

  const [vb, setVb] = useState(DEFAULTS[country]);
  const dragRef = useRef<{ x: number; y: number; vb: typeof vb } | null>(null);

  useEffect(() => { setVb(DEFAULTS[country]); /* reset on country switch */ // eslint-disable-next-line
  }, [country]);

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
    <div className="relative">
    <svg
      viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
      className="w-full h-auto max-h-[420px] rounded-md touch-none select-none cursor-grab active:cursor-grabbing"
      role="img"
      aria-label={`${country} wine regions map`}
      onWheel={(e) => { e.preventDefault(); zoom(e.deltaY > 0 ? 1.15 : 0.87); }}
      onPointerDown={(e) => {
        (e.target as Element).setPointerCapture?.(e.pointerId);
        dragRef.current = { x: e.clientX, y: e.clientY, vb };
      }}
      onPointerMove={(e) => {
        if (!dragRef.current) return;
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
      {/* Sea / canvas — always bright so labels read in light & dark mode */}
      <rect x="0" y="0" width="100" height="100" fill="oklch(0.97 0.015 230)" />
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
            onClick={(e) => { e.stopPropagation(); onSelect(r.id); }}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(r.id); }}
          >
            <circle
              cx={r.x} cy={r.y}
              r={active ? radius * 1.4 : radius}
              fill={color}
              stroke={active ? "oklch(0.15 0 0)" : "oklch(1 0 0)"}
              strokeWidth={active ? fontSize * 0.18 : fontSize * 0.11}
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
    </svg>

    {/* Zoom controls */}
    <div className="absolute right-2 top-2 flex flex-col gap-1">
      <button
        type="button" onClick={() => zoom(0.8)} aria-label="Zoom in"
        className="h-7 w-7 rounded-md border border-border bg-card/95 text-base font-semibold shadow-sm hover:bg-muted"
      >+</button>
      <button
        type="button" onClick={() => zoom(1.25)} aria-label="Zoom out"
        className="h-7 w-7 rounded-md border border-border bg-card/95 text-base font-semibold shadow-sm hover:bg-muted"
      >−</button>
      <button
        type="button" onClick={reset} aria-label="Reset zoom"
        className="h-7 w-7 rounded-md border border-border bg-card/95 text-[10px] font-semibold shadow-sm hover:bg-muted"
      >⤾</button>
    </div>
    </div>
  );
}