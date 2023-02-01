import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, type Mock, vi } from "vitest";
import { rest } from "msw";
import { render } from "../../../tests/test-utils";
import { server } from "../../../tests/msw";
import ProductForm from "./ProductForm";
import { api } from "../../utils/api";

// TODO: make this work without mocking somehow
vi.mock("../../utils/api.ts", () => ({
  api: {
    useContext: () => null,
    products: {
      add: {
        useMutation: vi.fn().mockReturnValue({
          mutateAsync: vi.fn(),
        }),
      },
      edit: {
        useMutation: vi.fn().mockReturnValue({
          mutateAsync: vi.fn(),
        }),
      },
    },
  },
}));

describe("ProductForm component", () => {
  it("renders", () => {
    render(<ProductForm />);
  });

  it("should submit the form", async () => {
    const result = {
      id: "cldlqyd9k0020sn35skofm5h5",
      name: "Test product",
      description: "This is a test",
      price: 4.2,
      image: "http://localhost/uploads/test.png",
      stock: 32,
    };

    server.use(
      rest.post("http://localhost/api/file", (req, res, ctx) => {
        return res(
          ctx.json({
            data: {
              href: "http://localhost/uploads/test.png",
            },
          })
        );
      })
    );

    (api.products.add.useMutation().mutateAsync as Mock).mockResolvedValue(
      result
    );

    const fakeFile = new File(["test"], "test.png", { type: "image/png" });
    const onSubmit = vi.fn();
    render(<ProductForm />, { onSubmit });

    const nameInput = screen.getByRole("textbox", { name: /name/i });
    await userEvent.type(nameInput, "Test Product");
    const priceInput = screen.getByRole("textbox", { name: /price/i });
    await userEvent.type(priceInput, "5.00");
    const stockInput = screen.getByRole("textbox", { name: /stock/i });
    await userEvent.type(stockInput, "32");
    const descriptionInput = screen.getByRole("textbox", {
      name: /description/i,
    });
    await userEvent.type(descriptionInput, "This is a test");
    const imageInput = screen.getByLabelText(/image/i);
    await userEvent.upload(imageInput, fakeFile);

    const submitButton = screen.getByRole("button", { name: /add product/i });
    await userEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith(result);
  });

  it("should show validation errors for required fields", async () => {
    render(<ProductForm />);

    const submitButton = screen.getByRole("button", { name: /add product/i });
    await userEvent.click(submitButton);

    screen.getByRole("alert", { name: /name is required/i });
    screen.getByRole("alert", { name: /price is required/i });
    screen.getByRole("alert", { name: /stock is required/i });
    screen.getByRole("alert", { name: /description is required/i });
    screen.getByRole("alert", { name: /image is required/i });
  });
});
