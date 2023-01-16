import { createContext, type ReactNode, useContext, useState } from "react";
import Dialog from "./Dialog";

export type DialogInstance = {
  component: ReactNode;
  title?: string;
};

export const DialogContext = createContext<{
  instance: DialogInstance | undefined | null;
  setInstance: (instance: DialogInstance | undefined | null) => void;
} | null>(null);

export function useDialogContext() {
  return useContext(DialogContext);
}

const DialogConsumer: React.FC = () => {
  const context = useDialogContext();

  if (!context?.instance?.component) return null;

  return (
    <Dialog title={context.instance.title}>{context.instance.component}</Dialog>
  );
};

const DialogProvider: React.FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const [instance, setInstance] = useState<DialogInstance | undefined | null>(
    null
  );
  return (
    <DialogContext.Provider
      value={{
        instance,
        setInstance,
      }}
    >
      <DialogConsumer />
      {children}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
