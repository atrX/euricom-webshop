import { z } from "zod";
import type { Product } from "@prisma/client";
import type { PagedResult } from "../../../types/pagination";
import { createTRPCRouter, publicProcedure, adminProcedure } from "../trpc";
import { productSchema } from "../../../schemas/product.schema";

export const productsRouter = createTRPCRouter({
  getPaged: publicProcedure
    .input(
      z
        .object({
          order: z.enum(["asc", "desc"]).optional(),
          orderBy: z.string().optional(),
          page: z.number().optional(),
          rowsPerPage: z.number().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input = {} }) => {
      const { order = "asc", orderBy, page = 1, rowsPerPage = 20 } = input;

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

      return {
        items: products,
        pagination: {
          order,
          orderBy,
          page,
          rowsPerPage,
          totalPages: Math.ceil(totalRows / rowsPerPage),
          totalRows,
        },
      } as PagedResult<Product>;
    }),

  get: publicProcedure.input(z.string()).query(async ({ ctx, input: id }) => {
    return ctx.prisma.product.findFirst({
      where: {
        id,
      },
    });
  }),

  remove: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: id }) => {
      return ctx.prisma.product.delete({
        where: {
          id,
        },
      });
    }),

  add: adminProcedure.input(productSchema).mutation(async ({ ctx, input }) => {
    return ctx.prisma.product.create({
      data: input,
    });
  }),

  edit: adminProcedure.input(productSchema).mutation(async ({ ctx, input }) => {
    const { id, ...data } = input;
    return ctx.prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }),
});
