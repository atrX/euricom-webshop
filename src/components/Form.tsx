import type { FormEvent, ReactNode } from "react";

export type FormProps = {
  children?: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};

const Form: React.FC<FormProps> = ({ children, onSubmit }) => (
  <form
    className="flex w-full flex-col gap-4"
    onSubmit={(event) => {
      event.preventDefault();
      onSubmit?.(event);
    }}
  >
    {children}
  </form>
);

export default Form;
