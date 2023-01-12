import type { ReactNode } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export type NavBarItemProps = {
  children?: ReactNode;
  href: string;
};

const NavBarItem: React.FC<NavBarItemProps> = ({ children, href }) => {
  const { asPath, isReady } = useRouter();
  const [computedClassName, setComputedClassName] = useState("");

  useEffect(() => {
    if (!isReady) return;

    const linkPathname = new URL(href, location.href).pathname;
    const activePathname = new URL(asPath, location.href).pathname;

    const newClassName = linkPathname === activePathname ? "active" : "";

    if (newClassName !== computedClassName) {
      setComputedClassName(newClassName);
    }
  }, [asPath, computedClassName, href, isReady]);

  return (
    <li>
      <Link className={computedClassName} href={href}>
        {children}
      </Link>
    </li>
  );
};

export default NavBarItem;
