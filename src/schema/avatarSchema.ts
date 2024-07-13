import { z } from "zod";

export const AvatarSchema = z.object({
    bio: z
        .string()
        .url({message: "Invalid image url"})
})