
import { z } from "zod";

export const categorySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, { message: "Название должно содержать минимум 2 символа" }),
  slug: z.string().min(2, { message: "Slug должен содержать минимум 2 символа" })
    .regex(/^[a-z0-9-]+$/, { message: "Slug может содержать только строчные буквы, цифры и дефисы" }),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
