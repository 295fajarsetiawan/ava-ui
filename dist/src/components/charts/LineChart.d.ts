import { HTMLAttributes } from 'react';
import { ChartDatum } from './chartUtils';
export interface LineChartProps extends HTMLAttributes<HTMLDivElement> {
    data: ChartDatum[];
    height?: number;
    width?: number;
    color?: string;
    ariaLabel?: string;
}
export declare function LineChart({ data, height, width, color, ariaLabel, className, ...props }: LineChartProps): import("react").JSX.Element;
