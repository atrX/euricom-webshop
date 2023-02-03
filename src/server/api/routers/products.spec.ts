/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Product } from "@prisma/client";
import { type inferProcedureInput, TRPCError } from "@trpc/server";
import { describe, expect, it } from "vitest";
import { type AppRouter, appRouter } from "../root";
import { createInnerTRPCContext } from "../trpc";

describe("products router", () => {
  const context = createInnerTRPCContext({ session: null });
  const caller = appRouter.createCaller(context);

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
    // type Input = inferProcedureInput<AppRouter["products"]["getPaged"]>;

    it("should return a paged product list", async () => {
      const result = await caller.products.getPaged();

      expect(result).toEqual(
        expect.objectContaining({
          items: expect.arrayContaining([
            expect.objectContaining({
              description: expect.any(String),
              id: expect.any(String),
              image: expect.any(String),
              name: expect.any(String),
              price: expect.any(Number),
              stock: expect.any(Number),
            }),
          ]),
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
  });
});
