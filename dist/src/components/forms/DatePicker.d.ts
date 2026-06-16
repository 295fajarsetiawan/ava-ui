import { InputHTMLAttributes } from 'react';
import { FormFieldBaseProps } from './formUtils';
export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type" | "value">, FormFieldBaseProps {
    clearable?: boolean;
    disabledDate?: (date: Date) => boolean;
    maxDate?: string;
    minDate?: string;
    onValueChange?: (value: string) => void;
    value?: string;
}
export declare function DatePicker({ className, clearable, defaultValue, disabled, disabledDate, error, fullWidth, helperText, id, label, maxDate, minDate, name, onValueChange, placeholder, required, value, ...props }: DatePickerProps): import("react").JSX.Element;
