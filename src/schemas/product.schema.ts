import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional().describe("Unique product identifier."),
  name: z.string().min(1, "Name is required").describe("Product name."),
  price: z
    .number({
      invalid_type_error: "Price is required",
    })
    .positive("Price must be greater than 0.00")
    .describe("Product price."),
  stock: z
    .number({
      invalid_type_error: "Stock is required",
    })
    .min(0, "Stock must be 0 or greater")
    .describe("Amount of items of this product type that are in stock."),
  description: z
    .string()
    .min(1, "Description is required")
    .describe("Product description."),
  image: z
    .string({
      invalid_type_error: "Image is required",
    })
    .describe("Product preview image."),
});
