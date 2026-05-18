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
        coords. Wide Alpine arc up top, body tapering SE down the Adriatic,
        Gargano spur on the east, heel of Puglia jutting east, concave Gulf
        of Taranto, and a clear toe of Calabria at the bottom.
      */}
      <path
        d="
          M 14,20
          C 20,14 30,12 40,15
          C 50,13 60,14 66,20
          C 70,24 66,29 60,28
          L 52,30
          C 50,34 52,38 54,42
          C 56,46 58,50 58,55
          C 60,58 64,60 64,64
          C 64,69 58,71 52,69
          C 49,68 46,67 44,68
          C 42,71 41,76 41,80
          L 39,84
          C 36,86 34,83 35,79
          L 37,73
          C 37,69 35,65 33,61
          L 31,54
          C 29,47 25,41 21,35
          L 17,28
          C 14,25 13,22 14,20
          Z
        "
        fill={fill} stroke={stroke} strokeWidth="0.6" strokeLinejoin="round"
      />
      {/* Sardinia - distinct island west of the mainland, around pin (25,64) */}
      <path
        d="M 22,56 C 16,57 14,63 16,70 C 17,76 22,79 26,77 C 30,75 31,68 30,62 C 29,57 26,55 22,56 Z"
        fill={fill} stroke={stroke} strokeWidth="0.6"
      />
      {/* Corsica hint (French) - small, faded, clearly above Sardinia */}
      <path
        d="M 22,48 C 19,48 17,51 18,54 C 19,55 24,55 25,53 C 26,50 25,48 22,48 Z"
        fill={fill} stroke={stroke} strokeWidth="0.4" opacity="0.45"
      />
      {/* Sicily - triangular island SW of the toe, around pin (44,94) */}
      <path
        d="M 30,90 C 38,87 50,87 56,91 C 58,94 54,98 48,98 L 34,98 C 30,97 28,93 30,90 Z"
        fill={fill} stroke={stroke} strokeWidth="0.6" strokeLinejoin="round"
      />
    </>
  );
}

function FranceShape({ fill, stroke }: ShapeProps) {
  return (
    <>
      {/*
        France - the classic Hexagone. Channel coast top, Brittany peninsula
        jutting west, Atlantic / Bay of Biscay on the west, flat Pyrenees
        across the south, Mediterranean SE, Alps and Rhine on the east.
      */}
      <path
        d="
          M 28,18
          C 36,15 48,14 58,17
          C 64,18 67,21 68,24
          L 70,30
          C 72,36 72,42 70,46
          L 70,52
          C 68,57 64,60 58,62
          L 50,65
          C 42,68 34,70 30,70
          C 24,70 22,66 24,60
          L 22,52
          C 20,46 18,42 16,38
          L 14,34
          C 13,32 14,30 16,30
          L 22,30
          C 24,26 26,22 28,20
          Z
        "
        fill={fill} stroke={stroke} strokeWidth="0.6" strokeLinejoin="round"
      />
      {/* Brittany peninsula - jutting west off the NW coast */}
      <path
        d="M 16,30 C 12,30 8,31 6,33 C 5,35 7,36 10,36 L 16,36 C 18,35 18,32 16,30 Z"
        fill={fill} stroke={stroke} strokeWidth="0.5" strokeLinejoin="round"
      />
      {/* Cotentin peninsula - small bump on the Channel coast */}
      <path
        d="M 30,18 C 30,15 32,14 33,15 C 34,16 34,18 33,19 C 32,20 30,20 30,18 Z"
        fill={fill} stroke={stroke} strokeWidth="0.4"
      />
      {/* Corsica - separate island in the Mediterranean SE */}
      <path
        d="M 66,66 C 63,66 62,70 63,74 C 64,77 67,77 68,73 C 69,70 68,66 66,66 Z"
        fill={fill} stroke={stroke} strokeWidth="0.5"
      />
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