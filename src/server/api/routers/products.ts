import { z } from "zod";
import type { Product } from "@prisma/client";
import type { PagedResult } from "../../../types/pagination";
import { createTRPCRouter, publicProcedure, adminProcedure } from "../trpc";
import { productSchema } from "../../../schemas/product.schema";
import { TRPCError } from "@trpc/server";

export const productsRouter = createTRPCRouter({
  getPaged: publicProcedure
    .meta({ description: "Get paged products." })
    .input(
      z
        .object({
          cursor: z
            .number()
            .nullish()
            .optional()
            .describe(
              'Page number. Equivalent to "page" parameter, but used for infinite queries.'
            ),
          order: z
            .enum(["asc", "desc"])
            .optional()
            .describe("Order to sort results in (asc, desc)."),
          orderBy: z
            .string()
            .optional()
            .describe("Property to sort results on."),
          page: z.number().optional().describe("Page number."),
          rowsPerPage: z
            .number()
            .optional()
            .describe("Amount of records to fetch per page."),
        })
        .optional()
    )
    .query(async ({ ctx, input = {} }) => {
      const { order = "asc", orderBy, rowsPerPage = 20 } = input;
      const page = input.cursor ?? input.page ?? 1;

      const query = {
        orderBy: {},
      };
      if (orderBy) {
        Object.assign(query, {
          orderBy: {
            [orderBy]: order,
          },
        });
      }

      const [totalRows, products] = await ctx.prisma.$transaction([
        ctx.prisma.product.count({
          ...query,
        }),
        ctx.prisma.product.findMany({
          ...query,
          skip: rowsPerPage * (page - 1),
          take: rowsPerPage,
        }),
      ]);

      const totalPages = Math.ceil(totalRows / rowsPerPage);
      const nextCursor = page < totalPages ? page + 1 : undefined;

      return {
        items: products,
        pagination: {
          order,
          orderBy,
          page,
          rowsPerPage,
          totalPages,
          totalRows,
        },
        nextCursor,
      } as PagedResult<Product>;
    }),

  get: publicProcedure
    .meta({ description: "Get single product." })
    .input(z.string().describe("Unique product identifier."))
    .query(async ({ ctx, input: id }) => {
      const product = await ctx.prisma.product.findFirst({
        where: {
          id,
        },
      });

      if (!product) throw new TRPCError({ code: "NOT_FOUND" });

      return product;
    }),

  remove: adminProcedure
    .meta({ description: "Remove a single product." })
    .input(z.string().describe("Unique product identifier."))
    .mutation(async ({ ctx, input: id }) => {
      return ctx.prisma.product.delete({
        where: {
          id,
        },
      });
    }),

  add: adminProcedure
    .meta({ description: "Add a product." })
    .input(productSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.product.create({
        data: input,
      });
    }),

  edit: adminProcedure
    .meta({ description: "Edit a product." })
    .input(productSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.product.update({
        where: {
          id,
        },
        data,
      });
    }),
});
