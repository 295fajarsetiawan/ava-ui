import { HTMLAttributes } from 'react';
import { ChartDatum } from './chartUtils';
export interface PieChartProps extends HTMLAttributes<HTMLDivElement> {
    data: ChartDatum[];
    size?: number;
    ariaLabel?: string;
    showLegend?: boolean;
}
export declare function PieChart({ data, size, ariaLabel, showLegend, className, ...props }: PieChartProps): import("react").JSX.Element;
