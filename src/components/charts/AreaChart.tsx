import { useId, type HTMLAttributes } from "react";
import {
  buildAreaPath,
  buildPolylinePath,
  cx,
  formatChartValue,
  getChartColor,
  getPlotPoints,
  type ChartDatum
} from "./chartUtils";

export interface AreaChartProps extends HTMLAttributes<HTMLDivElement> {
  data: ChartDatum[];
  height?: number;
  width?: number;
  color?: string;
  ariaLabel?: string;
}

export function AreaChart({
  data,
  height = 220,
  width = 520,
  color = "#2563eb",
  ariaLabel = "Area chart",
  className = "",
  ...props
}: AreaChartProps) {
  const padding = 28;
  const points = getPlotPoints(data, width, height, padding);
  const baselineY = height - padding;
  const linePath = buildPolylinePath(points);
  const areaPath = buildAreaPath(points, baselineY);
  const gradientId = useId().replace(/:/g, "");

  return (
    <div className={cx("rpc-chart", "rpc-area-chart", className)} {...props}>
      <svg className="rpc-chart__svg" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={ariaLabel}>
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.32" />
            <stop offset="100%" stopColor={color} stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <line className="rpc-chart__axis" x1={padding} x2={width - padding} y1={baselineY} y2={baselineY} />
        <path className="rpc-area-chart__fill" d={areaPath} fill={`url(#${gradientId})`} />
        <path className="rpc-area-chart__line" d={linePath} stroke={color} />
        {points.map((point, index) => (
          <g key={data[index].label}>
            <circle className="rpc-area-chart__point" cx={point.x} cy={point.y} fill={getChartColor(data[index], index)} r="4" />
            <title>
              {data[index].label}: {formatChartValue(data[index].value)}
            </title>
          </g>
        ))}
      </svg>
    </div>
  );
}
