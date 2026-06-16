import { HTMLAttributes } from 'react';
import { ChartDatum } from './chartUtils';
export interface RadarChartProps extends HTMLAttributes<HTMLDivElement> {
    data: ChartDatum[];
    size?: number;
    color?: string;
    levels?: number;
    ariaLabel?: string;
}
export declare function RadarChart({ data, size, color, levels, ariaLabel, className, ...props }: RadarChartProps): import("react").JSX.Element;
