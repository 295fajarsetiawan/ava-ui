import { useEffect, useId, useRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { cx, type FormFieldBaseProps } from "./formUtils";

export interface UploadAreaProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type" | "value">,
    FormFieldBaseProps {
  accept?: string;
  description?: ReactNode;
  files?: File[];
  maxFileSize?: number;
  multiple?: boolean;
  onFilesChange?: (files: File[]) => void;
  progress?: number | Record<string, number>;
}

function formatSize(size: number) {
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function acceptsFile(file: File, accept?: string) {
  if (!accept) return true;
  const rules = accept.split(",").map((item) => item.trim()).filter(Boolean);
  return rules.some((rule) => {
    if (rule.endsWith("/*")) return file.type.startsWith(rule.replace("/*", "/"));
    if (rule.startsWith(".")) return file.name.toLowerCase().endsWith(rule.toLowerCase());
    return file.type === rule;
  });
}

export function UploadArea({
  accept,
  className = "",
  description = "Drag file ke sini atau klik untuk memilih file.",
  disabled,
  error,
  files,
  fullWidth = true,
  helperText,
  id,
  label,
  maxFileSize,
  multiple = true,
  name,
  onFilesChange,
  progress,
  required,
  ...props
}: UploadAreaProps) {
  const fallbackId = useId();
  const inputId = id ?? name ?? fallbackId;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [innerFiles, setInnerFiles] = useState<File[]>([]);
  const [localError, setLocalError] = useState<ReactNode>(null);
  const currentFiles = files ?? innerFiles;
  const previews = currentFiles.map((file) => ({
    file,
    url: file.type.startsWith("image/") ? URL.createObjectURL(file) : null
  }));

  useEffect(() => {
    return () => previews.forEach((preview) => preview.url && URL.revokeObjectURL(preview.url));
  }, [currentFiles]);

  const commit = (nextFiles: File[]) => {
    if (files === undefined) setInnerFiles(nextFiles);
    onFilesChange?.(nextFiles);
  };

  const validate = (incomingFiles: File[]) => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    incomingFiles.forEach((file) => {
      if (maxFileSize && file.size > maxFileSize) {
        errors.push(`${file.name} melebihi ${formatSize(maxFileSize)}.`);
        return;
      }

      if (!acceptsFile(file, accept)) {
        errors.push(`${file.name} tidak sesuai tipe file.`);
        return;
      }

      validFiles.push(file);
    });

    setLocalError(errors[0] ?? null);
    return validFiles;
  };

  const addFiles = (fileList: FileList | File[]) => {
    const incoming = validate(Array.from(fileList));
    if (!incoming.length) return;
    commit(multiple ? [...currentFiles, ...incoming] : incoming.slice(0, 1));
  };

  const removeFile = (fileName: string) => {
    commit(currentFiles.filter((file) => file.name !== fileName));
  };

  const getProgress = (file: File) => {
    if (typeof progress === "number") return progress;
    return progress?.[file.name] ?? 0;
  };

  const message = error ?? localError ?? helperText;

  return (
    <div
      className={cx(
        "rpc-form-field",
        "rpc-upload",
        fullWidth && "rpc-form-field--full",
        disabled && "rpc-form-field--disabled",
        (error || localError) && "rpc-form-field--error",
        className
      )}
    >
      {label ? (
        <label className="rpc-form-field__label" htmlFor={inputId}>
          {label}
          {required ? <span className="rpc-form-field__required">*</span> : null}
        </label>
      ) : null}
      <button
        className={cx("rpc-upload__dropzone", isDragging && "rpc-upload__dropzone--dragging")}
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          addFiles(event.dataTransfer.files);
        }}
        type="button"
      >
        <span className="rpc-upload__icon" aria-hidden="true">
          ↑
        </span>
        <strong>Upload file</strong>
        <span>{description}</span>
        {accept ? <small>Allowed: {accept}</small> : null}
      </button>
      <input
        accept={accept}
        className="rpc-upload__input"
        disabled={disabled}
        id={inputId}
        multiple={multiple}
        name={name}
        onChange={(event) => {
          if (event.target.files) addFiles(event.target.files);
          event.target.value = "";
        }}
        ref={inputRef}
        required={required}
        type="file"
        {...props}
      />
      {currentFiles.length ? (
        <ul className="rpc-upload__list">
          {previews.map(({ file, url }) => (
            <li className="rpc-upload__item" key={`${file.name}-${file.lastModified}`}>
              {url ? <img alt={file.name} src={url} /> : <span className="rpc-upload__file-icon">FILE</span>}
              <span className="rpc-upload__meta">
                <strong>{file.name}</strong>
                <small>{formatSize(file.size)}</small>
                {getProgress(file) > 0 ? (
                  <span className="rpc-upload__progress">
                    <span style={{ width: `${Math.min(100, getProgress(file))}%` }} />
                  </span>
                ) : null}
              </span>
              <button aria-label={`Remove ${file.name}`} onClick={() => removeFile(file.name)} type="button">
                x
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {message ? <span className={cx("rpc-form-field__message", (error || localError) && "rpc-form-field__message--error")}>{message}</span> : null}
    </div>
  );
}
