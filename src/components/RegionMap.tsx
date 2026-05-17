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
          // explicitly opts in with a modifier — otherwise let the page scroll.
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

      {/* Sea / canvas — always bright so labels read in light & dark mode */}
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
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-background/70 px-2.5 py-1 text-[10px] text-muted-foreground backdrop-blur ring-1 ring-border/40">
        drag to pan · scroll to zoom
      </div>
    </div>
  );
}