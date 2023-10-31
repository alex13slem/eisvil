import { z } from "astro/zod";

const reqErrorText = "Это поле обязательно к заполнению";

export const formSchema = z.object({
  botField: z.boolean().optional(),
  name: z
    .string({ required_error: reqErrorText })
    .min(2, "Имя должно состоять хотя бы из двух букв"),
  email: z
    .string({ required_error: reqErrorText })
    .email("Введите корректный e-mail"),
  fromLink: z
    .string({ required_error: reqErrorText })
    .url("Адрес должен быть URL ссылкой"),
  contact: z.string().optional(),
  comment: z.string().optional(),
  access: z.boolean({ required_error: reqErrorText }),
});
