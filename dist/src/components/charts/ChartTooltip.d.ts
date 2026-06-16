import { HTMLAttributes, ReactNode } from 'react';
export interface ChartTooltipItem {
    label: string;
    value: number | string;
    color?: string;
}
export interface ChartTooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    title?: ReactNode;
    items: ChartTooltipItem[];
    footer?: ReactNode;
}
export declare function ChartTooltip({ title, items, footer, className, ...props }: ChartTooltipProps): import("react").JSX.Element;
