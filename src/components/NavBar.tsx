import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";
import NavBarItem from "./NavBarItem";

const NavBar: React.FC = () => {
  const { data: sessionData } = useSession();

  const isAdmin = sessionData?.user?.role === "ADMIN";

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <ul className="menu menu-horizontal px-1">
          <NavBarItem href="/">Home</NavBarItem>
          {isAdmin && <NavBarItem href="/admin/products">Admin</NavBarItem>}
        </ul>
      </div>
      <div>
        <ul>
          <Button
            variant="secondary"
            onClick={() => (sessionData ? void signOut() : void signIn())}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </Button>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
