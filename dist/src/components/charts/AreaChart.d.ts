import { HTMLAttributes } from 'react';
import { ChartDatum } from './chartUtils';
export interface AreaChartProps extends HTMLAttributes<HTMLDivElement> {
    data: ChartDatum[];
    height?: number;
    width?: number;
    color?: string;
    ariaLabel?: string;
}
export declare function AreaChart({ data, height, width, color, ariaLabel, className, ...props }: AreaChartProps): import("react").JSX.Element;
