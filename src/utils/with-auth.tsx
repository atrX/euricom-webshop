import type { ComponentType } from "react";
import { useSession } from "next-auth/react";
import Button from "../components/Button";
import { useRouter } from "next/router";

export function withAuth<Props extends object>(
  WrappedComponent: ComponentType<Props>
) {
  const GuardedComponent = (props: Props) => {
    const { push } = useRouter();
    const { data: sessionData } = useSession();

    if (sessionData) return <WrappedComponent {...props} />;

    return (
      <div>
        <h2>Not authorized</h2>
        <Button onClick={() => void push("/")}>Go back</Button>
      </div>
    );
  };
  return GuardedComponent;
}
