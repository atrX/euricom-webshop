import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { rest } from "msw";
import {
  render,
  screen,
  toTRPCResult,
  waitFor,
} from "../../../tests/test-utils";
import { server } from "../../../tests/msw";
import ProductForm from "./ProductForm";

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

    server.resetHandlers(
      rest.post("*/api/file", (req, res, ctx) => {
        return res(
          ctx.json({
            data: {
              href: "http://localhost/uploads/test.png",
            },
          })
        );
      }),
      rest.post("*/api/trpc/products.add", (req, res, ctx) => {
        return res(ctx.json(toTRPCResult(result)));
      })
    );

    const fakeFile = new File(["test"], "test.png", { type: "image/png" });
    const onSubmit = vi.fn();
    render<typeof ProductForm>(<ProductForm />, {
      initialProps: {
        onSubmit,
      },
    });

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

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(result));
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
