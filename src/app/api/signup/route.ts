import dbConnect from "@/lib/db";
import UserModel from "@/model/user.model";
import { SignupSchema } from "@/schema/signupSchema";
import bcrypt from "bcryptjs"

export async function POST(request: Request){

    await dbConnect()

    try {
        
        const {name, username, password} = await request.json()

        //Validating user info with zod
        const validatedUserSchema = SignupSchema.safeParse({
            name,
            username,
            password
        })

        if(!validatedUserSchema.success){
            const zodError = validatedUserSchema.error.issues[0].message;
            return Response.json({
                success: false,
                message: zodError
            }, {status: 406})
        }

        //Find existing user from database
        const exitingUser = await UserModel.findOne({username})
        if(exitingUser){
            return Response.json({
                success: false,
                message: "User with same username already exist."
            }, {status: 403})
        }

        //create a hashed password from original password
        const hashedPassword = await bcrypt.hash(password, 10)

        //create a new user in the database
        await UserModel.create({
            name,
            username,
            password: hashedPassword
        })

        return Response.json({
            success: true,
            message: "User registerd successfully."
        }, {status: 201})

    } catch (error) {
        return Response.json({
            success: false,
            message: "Error while registering."
        }, {status: 500})
    }    
}