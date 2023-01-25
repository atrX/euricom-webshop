import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  price: z
    .number({
      invalid_type_error: "Price is required",
    })
    .positive("Price must be greater than 0.00"),
  stock: z
    .number({
      invalid_type_error: "Stock is required",
    })
    .min(0, "Stock must be 0 or greater"),
  description: z.string().min(1, "Description is required"),
  image: z.string({
    invalid_type_error: "Image is required",
  }),
});
