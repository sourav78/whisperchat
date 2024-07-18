import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(3, { message: "Username at least 3 character long." })
    .max(15, { message: "Username must not be 15 character long." })
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not conatins special characters or space.")

export const SignupSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name at least 3 character long." })
        .max(50, { message: "Name must not be 50 character long." }),
    username: usernameValidation,
    password: z
        .string()
        .min(3, { message: "Password at least 3 character long." })
        .max(20, { message: "Password must not be 50 character long." }),
})