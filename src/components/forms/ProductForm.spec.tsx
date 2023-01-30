import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { rest } from "msw";
import { render } from "../../../tests/test-utils";
import { server } from "../../../tests/msw";
import ProductForm from "./ProductForm";

// TODO: make this work in test somehow
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

  // TODO: investigate why fetch call fails for file service
  it.skip("should submit the form", async () => {
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
      // rest.post("http://localhost/api/trpc/products.add", (req, res, ctx) => {
      //   return res(
      //     ctx.json([
      //       {
      //         result: {
      //           data: {
      //             json: {
      //               id: "foo",
      //             },
      //           },
      //         },
      //       },
      //     ])
      //   );
      // })
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

    expect(onSubmit).toHaveBeenCalledWith({});
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
