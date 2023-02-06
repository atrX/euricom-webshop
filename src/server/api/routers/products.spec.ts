/* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment */
import type { Product } from "@prisma/client";
import { type inferProcedureInput, TRPCError } from "@trpc/server";
import { describe, expect, it } from "vitest";
import { type AppRouter, appRouter } from "../root";
import { createInnerTRPCContext } from "../trpc";

function getTestProduct() {
  return {
    description: "Another test",
    image: "https://loremflickr.com/640/480/sports",
    name: "Another test",
    price: 41,
    stock: 14,
  };
}

describe("products router", () => {
  const context = createInnerTRPCContext({
    session: {
      expires: "",
      user: {
        id: "",
        role: "ADMIN",
      },
    },
  });
  const caller = appRouter.createCaller(context);

  let testProductId: string;

  function getItemMatcher() {
    return expect.objectContaining({
      description: expect.any(String),
      id: expect.any(String),
      image: expect.any(String),
      name: expect.any(String),
      price: expect.any(Number),
      stock: expect.any(Number),
    });
  }

  describe("get", () => {
    type Input = inferProcedureInput<AppRouter["products"]["get"]>;

    it("should return a product", async () => {
      const input: Input = "cldlqyd9k0020sn35skofm5h5";

      const result = await caller.products.get(input);

      expect(result).toMatchObject({
        description: "This is a test",
        id: input,
        image:
          "http://localhost:3000/uploads/d55621a6-3a4b-45ac-99a5-e384658beeac.webp",
        name: "Test product",
        price: 4.2,
        stock: 32,
      } as Product);
    });

    it("should return a not found error if the product does not exist", async () => {
      const input: Input = "0000000000000000000000000";

      const result = caller.products.get(input);

      await expect(result).rejects.toThrow(
        new TRPCError({ code: "NOT_FOUND" })
      );
    });
  });

  describe("getPaged", () => {
    type Input = inferProcedureInput<AppRouter["products"]["getPaged"]>;

    it("should return a paged product list", async () => {
      const result = await caller.products.getPaged();

      expect(result).toEqual(
        expect.objectContaining({
          items: expect.arrayContaining([getItemMatcher()]),
          nextCursor: expect.any(Number),
          pagination: expect.objectContaining({
            order: expect.stringMatching(/^(asc|desc)$/),
            orderBy: expect.anyOrNil(String),
            page: expect.any(Number),
            rowsPerPage: expect.any(Number),
            totalPages: expect.any(Number),
            totalRows: expect.any(Number),
          }),
        })
      );
    });

    describe("when page is defined", () => {
      it("should return the correct page", async () => {
        const input: Input = { page: 3 };
        const result = await caller.products.getPaged(input);

        expect(result).toEqual(
          expect.objectContaining({
            items: expect.arrayContaining([getItemMatcher()]),
            nextCursor: input.page! + 1,
            pagination: expect.objectContaining({
              page: input.page,
            }),
          })
        );
      });
    });

    describe("when cursor is defined", () => {
      it("should return the correct page", async () => {
        const input: Input = { cursor: 3 };
        const result = await caller.products.getPaged(input);

        expect(result).toEqual(
          expect.objectContaining({
            items: expect.arrayContaining([getItemMatcher()]),
            nextCursor: input.cursor! + 1,
            pagination: expect.objectContaining({
              page: input.cursor,
            }),
          })
        );
      });
    });
  });

  describe("add", () => {
    type Input = inferProcedureInput<AppRouter["products"]["add"]>;

    it("should add a product", async () => {
      const input: Input = {
        description: "This is a test",
        image: "https://loremflickr.com/640/480/food",
        name: "Test product",
        price: 36,
        stock: 17,
      };
      const result = await caller.products.add(input);

      expect(result).toEqual(
        expect.objectContaining({
          ...input,
          id: expect.any(String),
        })
      );

      const getResult = await caller.products.get(result.id);
      expect(getResult).toEqual(expect.objectContaining(result));

      // for further tests
      testProductId = result.id;
    });
  });

  describe("edit", () => {
    type Input = inferProcedureInput<AppRouter["products"]["edit"]>;

    it("should edit a product", async () => {
      const input: Input = {
        ...getTestProduct(),
        id: testProductId,
      };
      const result = await caller.products.edit(input);

      expect(result).toEqual(expect.objectContaining(input));

      const getResult = await caller.products.get(result.id);
      expect(getResult).toEqual(expect.objectContaining(result));
    });
  });

  describe("remove", () => {
    type Input = inferProcedureInput<AppRouter["products"]["remove"]>;

    it("should remove a product", async () => {
      const input: Input = testProductId;
      const result = await caller.products.remove(input);

      expect(result).toEqual(
        expect.objectContaining({
          ...getTestProduct(),
          id: input,
        })
      );

      const getResult = caller.products.get(result.id);
      await expect(getResult).rejects.toThrow(
        new TRPCError({ code: "NOT_FOUND" })
      );
    });
  });
});
