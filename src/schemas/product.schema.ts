import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .number({
      invalid_type_error: "Price is required",
    })
    .positive("Price must be greater than 0.00"),
  description: z.string().min(1, "Description is required"),
  image: z
    .string({
      invalid_type_error: "Image is required",
    })
    .regex(
      /^data:image\/(?:gif|png|jpeg|bmp|webp|svg\+xml)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/,
      "Image is invalid"
    ),
});
