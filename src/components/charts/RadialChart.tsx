import type { HTMLAttributes } from "react";
import { clampPercentage, cx, describeArc, formatChartValue, getChartColor, type ChartDatum } from "./chartUtils";

export interface RadialChartProps extends HTMLAttributes<HTMLDivElement> {
  data: ChartDatum[];
  size?: number;
  strokeWidth?: number;
  ariaLabel?: string;
}

export function RadialChart({
  data,
  size = 260,
  strokeWidth = 14,
  ariaLabel = "Radial chart",
  className = "",
  ...props
}: RadialChartProps) {
  const center = size / 2;
  const gap = 18;

  return (
    <div className={cx("rpc-chart", "rpc-radial-chart", className)} {...props}>
      <svg className="rpc-radial-chart__svg" viewBox={`0 0 ${size} ${size}`} role="img" aria-label={ariaLabel}>
        {data.map((item, index) => {
          const radius = center - strokeWidth / 2 - 14 - index * (strokeWidth + gap);
          const value = clampPercentage(item.value);
          const endAngle = (value / 100) * 359.99;

          if (radius <= 0) {
            return null;
          }

          return (
            <g key={item.label}>
              <circle className="rpc-radial-chart__track" cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
              {value > 0 ? (
                <path
                  className="rpc-radial-chart__value"
                  d={describeArc(center, center, radius, 0, endAngle)}
                  stroke={getChartColor(item, index)}
                  strokeWidth={strokeWidth}
                />
              ) : null}
              <title>
                {item.label}: {formatChartValue(value)}%
              </title>
            </g>
          );
        })}
        <text className="rpc-radial-chart__center" textAnchor="middle" x={center} y={center}>
          %
        </text>
      </svg>
      <div className="rpc-chart__legend">
        {data.map((item, index) => (
          <span className="rpc-chart__legend-item" key={item.label}>
            <span className="rpc-chart__legend-marker" style={{ backgroundColor: getChartColor(item, index) }} />
            {item.label} {formatChartValue(clampPercentage(item.value))}%
          </span>
        ))}
      </div>
    </div>
  );
}
