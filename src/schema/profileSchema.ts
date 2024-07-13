import { z } from "zod";

export const ProfileSchema = z.object({
    name: z
        .string()
        .min(3, {message: "Name at least 3 character long."})
        .max(50, {message: "Name must not be 50 character long."}),
    username: z
        .string()
        .min(3, {message: "Username at least 3 character long."})
        .max(15, {message: "Username must not be 15 character long."})
        .regex(/^[a-zA-Z0-9_]+$/, "Username must not conatins special characters."),
    bio: z
        .string()
        .max(200, {message: "Bio mut not be more than 200 character long."}),
})