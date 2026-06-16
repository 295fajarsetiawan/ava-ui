export interface ChartDatum {
    label: string;
    value: number;
    color?: string;
}
export interface ChartPoint {
    x: number;
    y: number;
}
export declare const CHART_COLORS: string[];
export declare function cx(...classes: Array<string | false | null | undefined>): string;
export declare function getChartColor(item: ChartDatum, index: number): string;
export declare function formatChartValue(value: number): string;
export declare function getValueRange(data: ChartDatum[]): {
    minValue: number;
    maxValue: number;
};
export declare function getPlotPoints(data: ChartDatum[], width: number, height: number, padding: number): {
    x: number;
    y: number;
}[];
export declare function buildPolylinePath(points: ChartPoint[]): string;
export declare function buildAreaPath(points: ChartPoint[], baselineY: number): string;
export declare function polarToCartesian(cxValue: number, cyValue: number, radius: number, angle: number): {
    x: number;
    y: number;
};
export declare function describeArc(cxValue: number, cyValue: number, radius: number, startAngle: number, endAngle: number): string;
export declare function describeSlice(cxValue: number, cyValue: number, radius: number, startAngle: number, endAngle: number): string;
export declare function clampPercentage(value: number): number;
