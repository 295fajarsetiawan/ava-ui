import type { HTMLAttributes } from "react";
import { buildPolylinePath, cx, formatChartValue, getChartColor, getPlotPoints, type ChartDatum } from "./chartUtils";

export interface LineChartProps extends HTMLAttributes<HTMLDivElement> {
  data: ChartDatum[];
  height?: number;
  width?: number;
  color?: string;
  ariaLabel?: string;
}

export function LineChart({
  data,
  height = 220,
  width = 520,
  color = "#2563eb",
  ariaLabel = "Line chart",
  className = "",
  ...props
}: LineChartProps) {
  const padding = 28;
  const points = getPlotPoints(data, width, height, padding);
  const linePath = buildPolylinePath(points);
  const baselineY = height - padding;

  return (
    <div className={cx("rpc-chart", "rpc-line-chart", className)} {...props}>
      <svg className="rpc-chart__svg" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={ariaLabel}>
        <line className="rpc-chart__axis" x1={padding} x2={width - padding} y1={baselineY} y2={baselineY} />
        <path className="rpc-line-chart__line" d={linePath} stroke={color} />
        {points.map((point, index) => (
          <g key={data[index].label}>
            <circle className="rpc-line-chart__point" cx={point.x} cy={point.y} fill={getChartColor(data[index], index)} r="4" />
            <title>
              {data[index].label}: {formatChartValue(data[index].value)}
            </title>
          </g>
        ))}
      </svg>
    </div>
  );
}
