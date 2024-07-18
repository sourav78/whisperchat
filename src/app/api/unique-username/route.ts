import dbConnect from "@/lib/db";
import UserModel from "@/model/user.model";
import { usernameValidation } from "@/schema/signupSchema";
import { z } from "zod";

const UsernameValidationSchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){
    await dbConnect()

    try {

        const {searchParams} = new URL(request.url)

        //extract the username from url
        const queryParams = {
            username: searchParams.get("username")
        }

        //Validating user info with zod
        const validatedUsername = UsernameValidationSchema.safeParse(queryParams)

        if(!validatedUsername.success){
            const usernameError = validatedUsername.error.format().username?._errors || []

            return Response.json({
                success: false,
                message: usernameError.length > 0 ? usernameError[0] : "Invalid username"
            }, {status: 403})
        }

        const {username} = validatedUsername.data

        ///Find existing user from database
        const user = await UserModel.findOne({username})

        if(user){
            return Response.json({
                success: false,
                message: "Username is already exist."
            }, {status: 400})
        }

        //If user is not found then send the ok response
        return Response.json({
            success: true,
            message: "Username is unique."
        }, {status: 200})
        
    } catch (error) {
        return Response.json({
            success: false,
            message: "Error while checking username"
        }, {status: 500})
    }
}