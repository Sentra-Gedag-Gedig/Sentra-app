import { z } from "zod";

export const loginSchema = z.object({
  phone_number: z
    .string()
    .min(10, "Nomor HP minimal 10 digit")
    .max(13, "Nomor HP maksimal 13 digit"),
  password: z
    .string()
    .min(8, "Password minimal 6 karakter")
    .max(32, "Password maksimal 32 karakter"),
  country: z.string().optional(),
});

export type loginInput = z.infer<typeof loginSchema>;

export const RegisterSchema = z.object({
  name: z.string().nonempty("Nama wajib diisi"),
  phone_number: z
    .string()
    .min(10, "Nomor HP minimal 10 digit")
    .max(15, "Nomor HP maksimal 15 digit"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  country: z.string().optional(),
});

export const resetPasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Minimal 8 karakter" })
      .nonempty({ message: "Password wajib diisi" }),
    confirmNewPassword: z
      .string()
      .nonempty({ message: "Konfirmasi wajib diisi" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password tidak cocok",
    path: ["confirmNewPassword"],
  });

export type resetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;
