import type { Meta } from "@storybook/react";
import { useState } from "react";
import FileInput from "./FileInput";

export default {
  component: FileInput,
} as Meta<typeof FileInput>;

export const Playground = () => {
  const [files, setFiles] = useState<Array<File> | null>(null);

  return (
    <div className="flex flex-wrap gap-1">
      <FileInput name="input" label="File input" onChange={setFiles} />
      {Boolean(files?.length) && <div>File selected: {files?.[0]?.name}</div>}
    </div>
  );
};

export const Multiple = () => {
  const [files, setFiles] = useState<Array<File> | null>(null);

  return (
    <div className="flex flex-wrap gap-1">
      <FileInput name="input" label="File input" multiple onChange={setFiles} />
      {Boolean(files?.length) && (
        <>
          <div>Files selected:</div>
          <ul className="w-full">
            {files?.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export const Data = () => {
  const [files, setFiles] = useState<Array<string> | null>(null);

  return (
    <div className="flex flex-wrap gap-1">
      <FileInput
        name="input"
        label="File input"
        accept="image/*"
        onChangeData={setFiles}
      />
      {Boolean(files?.length) && (
        <div className="w-full">
          <div>Preview:</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={files?.[0]} alt="Preview" />
        </div>
      )}
    </div>
  );
};
