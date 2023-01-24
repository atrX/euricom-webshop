import { render, screen } from "@testing-library/react";
import { useSession, type SessionContextValue } from "next-auth/react";
import { useRouter, type NextRouter } from "next/router";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from "vitest";
import type { Role } from "../types/role";
import NavBar from "./NavBar";

vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
}));

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

function getMockSession(role: Role = "USER") {
  return {
    expires: "",
    user: {
      id: "1",
      email: "john.doe@example.com",
      name: "JohnDoe",
      role,
    },
  };
}

describe("NavBar component", () => {
  function mockSession(value: Partial<SessionContextValue>) {
    (useSession as Mock).mockReturnValue(value);
  }

  function mockRouter(value: Partial<NextRouter>) {
    (useRouter as Mock).mockReturnValue({
      isReady: true,
      ...value,
    });
  }

  beforeEach(() => {
    mockSession({ data: null });
    mockRouter({ asPath: "/" });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render", () => {
    render(<NavBar />);
  });

  it("should show the active route", () => {
    render(<NavBar />);

    const products = screen.getByRole("link", { name: /products/i });
    expect(products).toHaveClass("active");
  });

  describe("when a user is not signed in", () => {
    it("should display the correct menu items", () => {
      render(<NavBar />);

      // should contain
      screen.getByRole("link", { name: /products/i });
      screen.getByRole("button", { name: /sign in/i });

      // should not contain
      expect(
        screen.queryByRole("link", { name: /admin/i })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /sign out/i })
      ).not.toBeInTheDocument();
    });
  });

  describe("when a user is signed in with role USER", () => {
    it("should display the correct menu items", () => {
      mockSession({ data: getMockSession() });

      render(<NavBar />);

      // should contain
      screen.getByRole("link", { name: /products/i });
      screen.getByRole("button", { name: /sign out/i });

      // should not contain
      expect(
        screen.queryByRole("link", { name: /admin/i })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /sign in/i })
      ).not.toBeInTheDocument();
    });
  });

  describe("when a user is signed in with role ADMIN", () => {
    it("should display the correct menu items", () => {
      mockSession({ data: getMockSession("ADMIN") });

      render(<NavBar />);

      // should contain
      screen.getByRole("link", { name: /products/i });
      screen.getByRole("link", { name: /admin/i });
      screen.getByRole("button", { name: /sign out/i });

      // should not contain
      expect(
        screen.queryByRole("button", { name: /sign in/i })
      ).not.toBeInTheDocument();
    });
  });
});
