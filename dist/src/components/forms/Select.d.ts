import { FormFieldBaseProps, SelectEndpointConfig, SelectOption } from './formUtils';
export type { SelectEndpointConfig, SelectOption } from './formUtils';
export type SelectLoadOptions = (query: string, page: number) => Promise<SelectOption[]> | SelectOption[];
interface SelectBaseProps extends FormFieldBaseProps {
    className?: string;
    clearable?: boolean;
    disabled?: boolean;
    endpoint?: string | SelectEndpointConfig;
    loadOptions?: SelectLoadOptions;
    name?: string;
    options?: SelectOption[];
    placeholder?: string;
    searchPlaceholder?: string;
    searchable?: boolean;
}
export interface SelectProps extends SelectBaseProps {
    defaultValue?: string;
    onValueChange?: (value: string, option: SelectOption | null) => void;
    value?: string;
}
export interface MultiSelectProps extends SelectBaseProps {
    defaultValue?: string[];
    maxVisibleTags?: number;
    onValueChange?: (value: string[], options: SelectOption[]) => void;
    value?: string[];
}
export declare function Select({ className, clearable, defaultValue, disabled, endpoint, error, fullWidth, helperText, label, loadOptions, name, onValueChange, options, placeholder, searchPlaceholder, required, searchable, value }: SelectProps): import("react").JSX.Element;
export declare function MultiSelect({ className, clearable, defaultValue, disabled, endpoint, error, fullWidth, helperText, label, loadOptions, maxVisibleTags, name, onValueChange, options, placeholder, searchPlaceholder, required, searchable, value }: MultiSelectProps): import("react").JSX.Element;
