
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, { message: "Название должно содержать не менее 3 символов" }),
  price: z.coerce.number().min(1, { message: "Цена должна быть больше 0" }),
  categoryId: z.coerce.number({ required_error: "Выберите категорию" }),
  description: z.string().optional(),
  manufacturer: z.string().min(1, { message: "Укажите производителя" }),
  image: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
