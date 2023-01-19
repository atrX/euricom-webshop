import classNames from "classnames";
import { type ChangeEvent, forwardRef, useState } from "react";
import type { FieldError } from "react-hook-form";
import { fileToDataURL } from "../utils/file";
import InputError from "./InputError";

export type FileInputProps = {
  accept?: string;
  disabled?: boolean;
  error?: FieldError | string;
  label?: string;
  multiple?: boolean;
  name?: string;
  onChange?: (value: Array<File> | null) => void;
  onChangeData?: (value: Array<string> | null) => void;
};

const FileInput: React.FC<FileInputProps> = forwardRef<
  HTMLInputElement,
  FileInputProps
>((props, ref) => {
  const {
    accept,
    disabled,
    error,
    label,
    multiple,
    name,
    onChange,
    onChangeData,
  } = props;
  const [value, setValue] = useState("");

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { files, value } = event.target;
    setValue(value);

    const fileList = files ? Array.from(files) : null;
    emitChange(fileList);
    emitDataChange(fileList);
  }

  function emitChange(files: Array<File> | null) {
    if (!onChange) return;
    if (!files?.length) return onChange(null);

    onChange(files);
  }

  function emitDataChange(files: Array<File> | null) {
    if (!onChangeData) return;
    if (!files?.length) return onChangeData(null);

    const data = files.map(fileToDataURL);
    void Promise.all(data).then((result) => onChangeData(result));
  }

  return (
    <div className="form-control w-full">
      {label && (
        <label htmlFor={name} className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        className={classNames(
          "file-input",
          "file-input-bordered",
          error && "file-input-error"
        )}
        ref={ref}
        id={name}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        value={value}
        onChange={changeHandler}
      />
      {error && <InputError value={error} />}
    </div>
  );
});
FileInput.displayName = "FileInput";

export default FileInput;
