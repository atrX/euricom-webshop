import type { ComponentType } from "react";
import { useSession } from "next-auth/react";
import Button from "../components/Button";
import { useRouter } from "next/router";
import type { Role } from "../types/role";

export function withAuth<Props extends object>(
  WrappedComponent: ComponentType<Props>,
  roles?: Array<Role>
) {
  const GuardedComponent = (props: Props) => {
    const { push } = useRouter();
    const { data: sessionData } = useSession();

    const isAuthorized =
      Boolean(sessionData) &&
      (!roles || roles.includes(sessionData?.user?.role ?? "USER"));

    if (isAuthorized) return <WrappedComponent {...props} />;

    return (
      <div>
        <h2>Not authorized</h2>
        <Button onClick={() => void push("/")}>Go back</Button>
      </div>
    );
  };
  return GuardedComponent;
}
