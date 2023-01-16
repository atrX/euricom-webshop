import type { Meta } from "@storybook/react";
import { useState } from "react";
import Button from "./Button";
import Dialog from "./Dialog";
import DialogActions from "./DialogActions";

export default {
  component: Dialog,
} as Meta<typeof Dialog>;

export const Playground: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-wrap gap-1">
      {isVisible && (
        <Dialog title="Dialog title">
          <div>Hello world!</div>
          <DialogActions>
            <Button onClick={() => setIsVisible(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
      <Button onClick={() => setIsVisible(true)}>Open dialog</Button>
    </div>
  );
};
