import { HTMLAttributes } from 'react';
import { ChartDatum } from './chartUtils';
export interface BarChartProps extends HTMLAttributes<HTMLDivElement> {
    data: ChartDatum[];
    height?: number;
    width?: number;
    ariaLabel?: string;
}
export declare function BarChart({ data, height, width, ariaLabel, className, ...props }: BarChartProps): import("react").JSX.Element;
