import type { HTMLAttributes } from "react";
import { cx, formatChartValue, getValueRange, polarToCartesian, type ChartDatum } from "./chartUtils";

export interface RadarChartProps extends HTMLAttributes<HTMLDivElement> {
  data: ChartDatum[];
  size?: number;
  color?: string;
  levels?: number;
  ariaLabel?: string;
}

export function RadarChart({
  data,
  size = 280,
  color = "#2563eb",
  levels = 4,
  ariaLabel = "Radar chart",
  className = "",
  ...props
}: RadarChartProps) {
  const center = size / 2;
  const radius = size / 2 - 42;
  const { maxValue } = getValueRange(data);
  const angleStep = 360 / Math.max(1, data.length);
  const polygonPoints = data
    .map((item, index) => {
      const angle = index * angleStep;
      const point = polarToCartesian(center, center, radius * (item.value / maxValue), angle);
      return `${point.x},${point.y}`;
    })
    .join(" ");

  return (
    <div className={cx("rpc-chart", "rpc-radar-chart", className)} {...props}>
      <svg className="rpc-radar-chart__svg" viewBox={`0 0 ${size} ${size}`} role="img" aria-label={ariaLabel}>
        {Array.from({ length: levels }).map((_, levelIndex) => {
          const levelRadius = radius * ((levelIndex + 1) / levels);
          const points = data
            .map((_, index) => {
              const point = polarToCartesian(center, center, levelRadius, index * angleStep);
              return `${point.x},${point.y}`;
            })
            .join(" ");

          return <polygon className="rpc-radar-chart__grid" key={levelRadius} points={points} />;
        })}
        {data.map((item, index) => {
          const outerPoint = polarToCartesian(center, center, radius, index * angleStep);
          const labelPoint = polarToCartesian(center, center, radius + 24, index * angleStep);

          return (
            <g key={item.label}>
              <line className="rpc-radar-chart__axis" x1={center} x2={outerPoint.x} y1={center} y2={outerPoint.y} />
              <text className="rpc-radar-chart__label" textAnchor="middle" x={labelPoint.x} y={labelPoint.y}>
                {item.label}
              </text>
              <title>
                {item.label}: {formatChartValue(item.value)}
              </title>
            </g>
          );
        })}
        <polygon className="rpc-radar-chart__area" fill={color} points={polygonPoints} stroke={color} />
      </svg>
    </div>
  );
}
