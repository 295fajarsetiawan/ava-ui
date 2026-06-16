import type { HTMLAttributes } from "react";
import { cx, describeSlice, formatChartValue, getChartColor, polarToCartesian, type ChartDatum } from "./chartUtils";

export interface PieChartProps extends HTMLAttributes<HTMLDivElement> {
  data: ChartDatum[];
  size?: number;
  ariaLabel?: string;
  showLegend?: boolean;
}

export function PieChart({
  data,
  size = 240,
  ariaLabel = "Pie chart",
  showLegend = true,
  className = "",
  ...props
}: PieChartProps) {
  const radius = size / 2 - 14;
  const center = size / 2;
  const total = data.reduce((sum, item) => sum + Math.max(0, item.value), 0);
  let currentAngle = 0;

  return (
    <div className={cx("rpc-chart", "rpc-pie-chart", className)} {...props}>
      <svg className="rpc-pie-chart__svg" viewBox={`0 0 ${size} ${size}`} role="img" aria-label={ariaLabel}>
        {total > 0 ? (
          data.map((item, index) => {
            const value = Math.max(0, item.value);
            const angle = (value / total) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            const midpoint = polarToCartesian(center, center, radius * 0.62, startAngle + angle / 2);
            currentAngle = endAngle;

            if (value === 0) {
              return null;
            }

            return (
              <g key={item.label}>
                {angle >= 359.99 ? (
                  <circle className="rpc-pie-chart__slice" cx={center} cy={center} fill={getChartColor(item, index)} r={radius} />
                ) : (
                  <path
                    className="rpc-pie-chart__slice"
                    d={describeSlice(center, center, radius, startAngle, endAngle)}
                    fill={getChartColor(item, index)}
                  />
                )}
                {angle > 28 ? (
                  <text className="rpc-pie-chart__value" textAnchor="middle" x={midpoint.x} y={midpoint.y}>
                    {Math.round((value / total) * 100)}%
                  </text>
                ) : null}
                <title>
                  {item.label}: {formatChartValue(item.value)}
                </title>
              </g>
            );
          })
        ) : (
          <circle className="rpc-chart__empty" cx={center} cy={center} r={radius} />
        )}
      </svg>
      {showLegend ? (
        <div className="rpc-chart__legend">
          {data.map((item, index) => (
            <span className="rpc-chart__legend-item" key={item.label}>
              <span className="rpc-chart__legend-marker" style={{ backgroundColor: getChartColor(item, index) }} />
              {item.label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
