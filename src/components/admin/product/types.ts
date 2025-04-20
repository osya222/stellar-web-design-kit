
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, { message: "Name must contain at least 3 characters" }),
  price: z.coerce.number().min(1, { message: "Price must be greater than 0" }),
  categoryId: z.coerce.number({ required_error: "Please select a category" }),
  description: z.string().optional(),
  manufacturer: z.string().min(1, { message: "Manufacturer is required" }),
  image: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
