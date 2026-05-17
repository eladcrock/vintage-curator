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
      {/*
        Mainland — a recognizable "boot" tuned to the (0..100, 0..100) viewBox
        used by region coords. Alpine arc up top, Apennine spine running SE,
        Gargano spur, heel of Puglia, Gulf of Taranto, toe of Calabria.
      */}
      <path
        d="
          M 18,22
          C 14,18 20,14 26,15
          L 38,16
          C 46,14 54,15 60,19
          L 66,22
          C 70,24 68,28 64,28
          L 56,28
          C 54,30 56,34 54,36
          L 48,40
          C 44,44 42,50 44,54
          L 48,60
          C 50,64 52,66 54,66
          L 60,64
          C 66,62 70,64 72,68
          L 74,72
          C 74,74 70,74 66,72
          L 60,70
          C 58,72 60,76 62,78
          L 64,82
          C 62,84 58,82 56,80
          L 50,76
          C 48,80 50,84 48,86
          L 44,88
          C 40,86 40,82 42,78
          L 40,72
          C 38,68 36,64 36,58
          L 34,52
          C 32,46 30,42 28,38
          L 24,32
          C 20,30 18,26 18,22
          Z
        "
        fill={fill} stroke={stroke} strokeWidth="0.6" strokeLinejoin="round"
      />
      {/* Sardinia — distinct oblong island, well west of the mainland */}
      <path
        d="M 22,58 C 17,58 15,62 16,68 C 16,73 18,76 22,76 C 26,76 28,72 28,67 C 28,62 26,58 22,58 Z"
        fill={fill} stroke={stroke} strokeWidth="0.6"
      />
      {/* Corsica hint (French) — small, faded, clearly above Sardinia */}
      <path
        d="M 22,49 C 19,49 18,52 19,55 C 20,56 24,56 25,55 C 26,52 25,49 22,49 Z"
        fill={fill} stroke={stroke} strokeWidth="0.4" opacity="0.45"
      />
      {/* Sicily — triangle SW of the toe, clear Strait of Messina gap */}
      <path
        d="M 36,92 L 56,90 L 52,98 L 38,98 Z"
        fill={fill} stroke={stroke} strokeWidth="0.6" strokeLinejoin="round"
      />
    </>
  );
}

function FranceShape({ fill, stroke }: ShapeProps) {
  return (
    <>
      {/*
        France — the classic Hexagone: Channel coast top-left, Atlantic
        bulge west, Pyrenees flat across the south, Mediterranean SE,
        Alps and Rhine east. Brittany peninsula juts left.
      */}
      <path
        d="
          M 30,18
          C 36,16 44,16 50,18
          L 58,20
          C 62,22 60,26 58,26
          L 60,30
          C 64,32 68,36 70,42
          L 72,48
          C 72,54 68,58 64,60
          L 60,66
          C 56,72 50,76 42,76
          L 32,76
          C 26,74 22,70 20,64
          L 16,58
          C 14,52 14,46 18,42
          L 12,40
          C 10,38 12,36 16,36
          L 22,36
          C 24,32 26,28 28,24
          Z
        "
        fill={fill} stroke={stroke} strokeWidth="0.6" strokeLinejoin="round"
      />
      {/* Corsica */}
      <path
        d="M 64,66 C 62,66 61,69 62,72 C 63,75 66,75 67,72 C 68,69 67,66 64,66 Z"
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
      <div className="pointer-events-none absolute bottom-3 left-3 hidden sm:block rounded-full bg-background/70 px-2.5 py-1 text-[10px] text-muted-foreground backdrop-blur ring-1 ring-border/40">
        drag to pan · ⌘/Ctrl + scroll to zoom
      </div>
    </div>
  );
}