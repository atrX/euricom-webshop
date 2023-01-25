import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const cartRouter = createTRPCRouter({
  getCart: protectedProcedure.query(async ({ ctx }) => {
    // create if doesn't exist
    return ctx.prisma.cart.upsert({
      where: {
        userId: ctx.session.user.id,
      },
      create: {
        userId: ctx.session.user.id,
      },
      update: {},
      include: {
        cartProducts: {
          include: {
            product: true,
          },
        },
      },
    });
  }),

  // TODO: improve this query (possibly reduce to single query?)
  addToCart: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .mutation(async ({ ctx, input: { productId } }) => {
      const cart = await ctx.prisma.cart.findFirstOrThrow({
        where: {
          userId: ctx.session.user.id,
        },
      });

      const cartProduct = await ctx.prisma.cartProduct.findFirst({
        where: {
          cartId: cart.id,
          productId,
        },
      });

      return ctx.prisma.cartProduct.upsert({
        where: {
          id: cartProduct?.id ?? "",
        },
        create: {
          productId,
          amount: 1,
          cartId: cart.id,
        },
        update: {
          amount: (cartProduct?.amount ?? 0) + 1,
        },
      });
    }),

  setQuantity: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        amount: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.cartProduct.update({
        where: {
          id: input.id,
        },
        data: {
          amount: input.amount,
        },
      });
    }),

  removeFromCart: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: id }) => {
      return ctx.prisma.cartProduct.delete({
        where: {
          id,
        },
      });
    }),
});
