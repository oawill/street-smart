"use client";

import { ATTRIBUTES, ATTRIBUTE_LABELS, Attribute } from "@/types/game";

interface RadarChartProps {
  attributes: Record<Attribute, number>;
  size?: number;
}

function pointOnAxis(index: number, total: number, radius: number, center: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
  };
}

export function RadarChart({ attributes, size = 300 }: RadarChartProps) {
  const total = ATTRIBUTES.length;
  const center = size / 2;
  const maxRadius = size * 0.32;
  const labelRadius = size * 0.43;

  const rings = [0.25, 0.5, 0.75, 1];

  const dataPoints = ATTRIBUTES.map((attr, i) => {
    const value = Math.max(0, Math.min(100, attributes[attr])) / 100;
    const p = pointOnAxis(i, total, maxRadius * value, center);
    return `${p.x},${p.y}`;
  }).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%" role="img" aria-label="Attribute radar chart">
      {rings.map((r) => {
        const pts = ATTRIBUTES.map((_, i) => {
          const p = pointOnAxis(i, total, maxRadius * r, center);
          return `${p.x},${p.y}`;
        }).join(" ");
        return (
          <polygon
            key={r}
            points={pts}
            fill="none"
            stroke="var(--border)"
            strokeWidth={1}
          />
        );
      })}

      {ATTRIBUTES.map((_, i) => {
        const p = pointOnAxis(i, total, maxRadius, center);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="var(--border)"
            strokeWidth={1}
          />
        );
      })}

      <polygon
        points={dataPoints}
        fill="var(--brand)"
        fillOpacity={0.28}
        stroke="var(--brand)"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {ATTRIBUTES.map((attr, i) => {
        const value = Math.max(0, Math.min(100, attributes[attr])) / 100;
        const p = pointOnAxis(i, total, maxRadius * value, center);
        return <circle key={attr} cx={p.x} cy={p.y} r={3} fill="var(--brand-strong)" />;
      })}

      {ATTRIBUTES.map((attr, i) => {
        const p = pointOnAxis(i, total, labelRadius, center);
        const anchor = Math.abs(p.x - center) < 4 ? "middle" : p.x > center ? "start" : "end";
        const label = ATTRIBUTE_LABELS[attr];
        const words = label.split(" ");
        return (
          <text
            key={attr}
            x={p.x}
            y={p.y}
            textAnchor={anchor}
            fontSize={size * 0.032}
            fill="var(--muted)"
            fontFamily="var(--font-inter)"
          >
            {words.length > 1 ? (
              words.map((w, wi) => (
                <tspan key={wi} x={p.x} dy={wi === 0 ? -3 : 12}>
                  {w}
                </tspan>
              ))
            ) : (
              label
            )}
          </text>
        );
      })}
    </svg>
  );
}
