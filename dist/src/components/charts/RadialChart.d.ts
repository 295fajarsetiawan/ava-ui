import { HTMLAttributes } from 'react';
import { ChartDatum } from './chartUtils';
export interface RadialChartProps extends HTMLAttributes<HTMLDivElement> {
    data: ChartDatum[];
    size?: number;
    strokeWidth?: number;
    ariaLabel?: string;
}
export declare function RadialChart({ data, size, strokeWidth, ariaLabel, className, ...props }: RadialChartProps): import("react").JSX.Element;
