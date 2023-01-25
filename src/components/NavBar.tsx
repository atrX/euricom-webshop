import { signIn, signOut, useSession } from "next-auth/react";
import { MdShoppingCart } from "react-icons/md";
import Button from "./Button";
import NavBarItem from "./NavBarItem";

const NavBar: React.FC = () => {
  const { data: sessionData } = useSession();

  const isAdmin = sessionData?.user?.role === "ADMIN";
  const isSignedIn = Boolean(sessionData?.user);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <ul className="menu menu-horizontal gap-2 px-1">
          <NavBarItem href="/">Products</NavBarItem>
          {isAdmin && <NavBarItem href="/admin/products">Admin</NavBarItem>}
        </ul>
      </div>
      <div>
        <ul className="menu menu-horizontal gap-2 px-1">
          {isSignedIn && (
            <NavBarItem href="/cart">
              <MdShoppingCart size={20} />
            </NavBarItem>
          )}
          <li>
            <Button
              variant="secondary"
              onClick={() => (sessionData ? void signOut() : void signIn())}
            >
              {sessionData ? "Sign out" : "Sign in"}
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
