import { z } from "zod";
import { usernameValidation } from "./signupSchema";

export const ProfileSchema = z.object({
    name: z
        .string()
        .min(3, {message: "Name at least 3 character long."})
        .max(50, {message: "Name must not be 50 character long."}),
    username: usernameValidation,
    bio: z
        .string()
        .max(200, {message: "Bio mut not be more than 200 character long."}),
})