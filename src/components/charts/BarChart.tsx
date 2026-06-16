import type { HTMLAttributes } from "react";
import { cx, formatChartValue, getChartColor, getValueRange, type ChartDatum } from "./chartUtils";

export interface BarChartProps extends HTMLAttributes<HTMLDivElement> {
  data: ChartDatum[];
  height?: number;
  width?: number;
  ariaLabel?: string;
}

export function BarChart({
  data,
  height = 240,
  width = 520,
  ariaLabel = "Bar chart",
  className = "",
  ...props
}: BarChartProps) {
  const padding = 28;
  const gap = 14;
  const { minValue, maxValue } = getValueRange(data);
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  const barWidth = Math.max(10, (innerWidth - gap * Math.max(0, data.length - 1)) / Math.max(1, data.length));
  const baselineY = height - padding;

  return (
    <div className={cx("rpc-chart", "rpc-bar-chart", className)} {...props}>
      <svg className="rpc-chart__svg" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={ariaLabel}>
        <line className="rpc-chart__axis" x1={padding} x2={width - padding} y1={baselineY} y2={baselineY} />
        {data.map((item, index) => {
          const normalized = (item.value - minValue) / (maxValue - minValue);
          const barHeight = normalized * innerHeight;
          const x = padding + index * (barWidth + gap);
          const y = baselineY - barHeight;

          return (
            <g key={item.label}>
              <rect
                className="rpc-bar-chart__bar"
                fill={getChartColor(item, index)}
                height={barHeight}
                rx="7"
                width={barWidth}
                x={x}
                y={y}
              />
              <text className="rpc-chart__label" textAnchor="middle" x={x + barWidth / 2} y={height - 7}>
                {item.label}
              </text>
              <title>
                {item.label}: {formatChartValue(item.value)}
              </title>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
