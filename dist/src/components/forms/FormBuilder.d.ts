import { FormEvent, ReactNode } from 'react';
import { SelectLoadOptions } from './Select';
import { SelectOption } from './formUtils';
export type FormBuilderValues = Record<string, unknown>;
export type FormFieldName<TValues extends FormBuilderValues> = Extract<keyof TValues, string>;
export type FormFieldKind = "text" | "textarea" | "otp" | "checkbox" | "switch" | "radio" | "range" | "rating" | "color" | "date" | "time" | "date-range" | "select" | "datetime" | "file";
export interface DateRangeValue {
    start?: string;
    end?: string;
}
export interface FormFieldRenderProps {
    accept?: string;
    allowPasswordToggle?: boolean;
    className?: string;
    description?: ReactNode;
    disabled?: boolean;
    hint?: ReactNode;
    inputClassName?: string;
    length?: number;
    max?: number | string;
    min?: number | string;
    multiple?: boolean;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    searchPlaceholder?: string;
    searchable?: boolean;
    step?: number;
    type?: "text" | "search" | "url" | "tel" | "email" | "password" | "number";
}
export interface FormFieldRenderContext<TValues extends FormBuilderValues> {
    field: FormFieldConfig<TValues>;
    value: unknown;
    values: Partial<TValues>;
    error?: ReactNode;
    setValue: (value: unknown) => void;
}
export interface FormFieldConfig<TValues extends FormBuilderValues = FormBuilderValues> {
    kind: FormFieldKind;
    name: FormFieldName<TValues>;
    label?: ReactNode;
    row?: string;
    options?: SelectOption[];
    loadOptions?: SelectLoadOptions;
    props?: FormFieldRenderProps;
    render?: (context: FormFieldRenderContext<TValues>) => ReactNode;
}
export interface FormBuilderProps<TValues extends FormBuilderValues = FormBuilderValues> {
    actions?: ReactNode;
    className?: string;
    columns?: number;
    defaultValues?: Partial<TValues>;
    errors?: Partial<Record<FormFieldName<TValues>, ReactNode>>;
    fields: FormFieldConfig<TValues>[];
    onReset?: () => void;
    onSubmit?: (values: Partial<TValues>, event: FormEvent<HTMLFormElement>) => void;
    onValuesChange?: (values: Partial<TValues>, changedName: FormFieldName<TValues>, value: unknown) => void;
    resetLabel?: ReactNode;
    showActions?: boolean;
    submitLabel?: ReactNode;
    values?: Partial<TValues>;
}
export declare function FormBuilder<TValues extends FormBuilderValues = FormBuilderValues>({ actions, className, columns, defaultValues, errors, fields, onReset, onSubmit, onValuesChange, resetLabel, showActions, submitLabel, values }: FormBuilderProps<TValues>): import("react").JSX.Element;
