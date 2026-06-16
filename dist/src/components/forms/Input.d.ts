import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { FormFieldBaseProps } from './formUtils';
export type TextInputType = "text" | "search" | "url" | "tel" | "email" | "password";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix" | "suffix" | "type">, FormFieldBaseProps {
    inputClassName?: string;
    type?: TextInputType;
    prefix?: ReactNode;
    suffix?: ReactNode;
    validationMessage?: ReactNode;
}
export declare const Input: import('react').ForwardRefExoticComponent<InputProps & import('react').RefAttributes<HTMLInputElement>>;
export interface InputNumberProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "prefix" | "suffix" | "type" | "value">, FormFieldBaseProps {
    formatNumber?: boolean;
    inputClassName?: string;
    onValueChange?: (value: number | null) => void;
    prefix?: ReactNode;
    suffix?: ReactNode;
    value?: number | string;
}
export declare const InputNumber: import('react').ForwardRefExoticComponent<InputNumberProps & import('react').RefAttributes<HTMLInputElement>>;
export interface InputEmailProps extends Omit<InputProps, "type"> {
    validateOnBlur?: boolean;
}
export declare const InputEmail: import('react').ForwardRefExoticComponent<InputEmailProps & import('react').RefAttributes<HTMLInputElement>>;
export interface InputPasswordProps extends Omit<InputProps, "suffix" | "type"> {
    showStrength?: boolean;
}
export declare const InputPassword: import('react').ForwardRefExoticComponent<InputPasswordProps & import('react').RefAttributes<HTMLInputElement>>;
export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FormFieldBaseProps {
    autoResize?: boolean;
    inputClassName?: string;
    showCounter?: boolean;
}
export declare const TextArea: import('react').ForwardRefExoticComponent<TextAreaProps & import('react').RefAttributes<HTMLTextAreaElement>>;
