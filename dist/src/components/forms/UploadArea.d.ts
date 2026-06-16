import { InputHTMLAttributes, ReactNode } from 'react';
import { FormFieldBaseProps } from './formUtils';
export interface UploadAreaProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type" | "value">, FormFieldBaseProps {
    accept?: string;
    description?: ReactNode;
    files?: File[];
    maxFileSize?: number;
    multiple?: boolean;
    onFilesChange?: (files: File[]) => void;
    progress?: number | Record<string, number>;
}
export declare function UploadArea({ accept, className, description, disabled, error, files, fullWidth, helperText, id, label, maxFileSize, multiple, name, onFilesChange, progress, required, ...props }: UploadAreaProps): import("react").JSX.Element;
