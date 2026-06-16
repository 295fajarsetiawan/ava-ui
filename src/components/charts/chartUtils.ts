export interface ChartDatum {
  label: string;
  value: number;
  color?: string;
}

export interface ChartPoint {
  x: number;
  y: number;
}

export const CHART_COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed", "#0891b2"];

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getChartColor(item: ChartDatum, index: number) {
  return item.color ?? CHART_COLORS[index % CHART_COLORS.length];
}

export function formatChartValue(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2
  }).format(value);
}

export function getValueRange(data: ChartDatum[]) {
  const values = data.map((item) => item.value);
  const minValue = Math.min(0, ...values);
  const maxValue = Math.max(1, ...values);

  if (minValue === maxValue) {
    return { minValue: 0, maxValue: maxValue + 1 };
  }

  return { minValue, maxValue };
}

export function getPlotPoints(data: ChartDatum[], width: number, height: number, padding: number) {
  const { minValue, maxValue } = getValueRange(data);
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  const divisor = Math.max(1, data.length - 1);

  return data.map((item, index) => {
    const x = padding + (index / divisor) * innerWidth;
    const normalized = (item.value - minValue) / (maxValue - minValue);
    const y = padding + innerHeight - normalized * innerHeight;

    return { x, y };
  });
}

export function buildPolylinePath(points: ChartPoint[]) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
}

export function buildAreaPath(points: ChartPoint[], baselineY: number) {
  if (points.length === 0) {
    return "";
  }

  const linePath = buildPolylinePath(points);
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];

  return `${linePath} L ${lastPoint.x} ${baselineY} L ${firstPoint.x} ${baselineY} Z`;
}

export function polarToCartesian(cxValue: number, cyValue: number, radius: number, angle: number) {
  const angleInRadians = ((angle - 90) * Math.PI) / 180;

  return {
    x: cxValue + radius * Math.cos(angleInRadians),
    y: cyValue + radius * Math.sin(angleInRadians)
  };
}

export function describeArc(cxValue: number, cyValue: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cxValue, cyValue, radius, endAngle);
  const end = polarToCartesian(cxValue, cyValue, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [`M ${start.x} ${start.y}`, `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`].join(" ");
}

export function describeSlice(cxValue: number, cyValue: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cxValue, cyValue, radius, endAngle);
  const end = polarToCartesian(cxValue, cyValue, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${cxValue} ${cyValue}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z"
  ].join(" ");
}

export function clampPercentage(value: number) {
  return Math.max(0, Math.min(100, value));
}
