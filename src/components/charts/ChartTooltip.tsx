import type { HTMLAttributes, ReactNode } from "react";
import { cx, formatChartValue } from "./chartUtils";

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

export function ChartTooltip({ title, items, footer, className = "", ...props }: ChartTooltipProps) {
  return (
    <div className={cx("rpc-chart-tooltip", className)} role="tooltip" {...props}>
      {title ? <div className="rpc-chart-tooltip__title">{title}</div> : null}
      <div className="rpc-chart-tooltip__items">
        {items.map((item) => (
          <div className="rpc-chart-tooltip__item" key={`${item.label}-${item.value}`}>
            <span
              aria-hidden="true"
              className="rpc-chart-tooltip__marker"
              style={item.color ? { backgroundColor: item.color } : undefined}
            />
            <span className="rpc-chart-tooltip__label">{item.label}</span>
            <strong className="rpc-chart-tooltip__value">
              {typeof item.value === "number" ? formatChartValue(item.value) : item.value}
            </strong>
          </div>
        ))}
      </div>
      {footer ? <div className="rpc-chart-tooltip__footer">{footer}</div> : null}
    </div>
  );
}
