import { InputHTMLAttributes, ReactNode } from 'react';
import { FormFieldBaseProps, SelectOption } from './formUtils';
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">, Omit<FormFieldBaseProps, "fullWidth"> {
    description?: ReactNode;
}
export declare const Checkbox: import('react').ForwardRefExoticComponent<CheckboxProps & import('react').RefAttributes<HTMLInputElement>>;
export interface CheckboxGroupProps extends FormFieldBaseProps {
    className?: string;
    description?: ReactNode;
    disabled?: boolean;
    layout?: "horizontal" | "vertical";
    name?: string;
    onValueChange?: (values: string[]) => void;
    options: SelectOption[];
    value?: string[];
    defaultValue?: string[];
}
export declare function CheckboxGroup({ className, defaultValue, disabled, error, helperText, label, layout, name, onValueChange, options, required, value }: CheckboxGroupProps): import("react").JSX.Element;
export interface RadioGroupProps extends FormFieldBaseProps {
    className?: string;
    disabled?: boolean;
    layout?: "horizontal" | "vertical";
    name?: string;
    onValueChange?: (value: string) => void;
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
}
export declare function RadioGroup({ className, defaultValue, disabled, error, helperText, label, layout, name, onValueChange, options, required, value }: RadioGroupProps): import("react").JSX.Element;
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">, Omit<FormFieldBaseProps, "fullWidth"> {
    description?: ReactNode;
    onLabel?: ReactNode;
    offLabel?: ReactNode;
}
export declare const Switch: import('react').ForwardRefExoticComponent<SwitchProps & import('react').RefAttributes<HTMLInputElement>>;
