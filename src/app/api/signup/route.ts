import dbConnect from "@/lib/db";
import UserModel from "@/model/user.model";
import { SignupSchema } from "@/schema/signupSchema";
import bcrypt from "bcryptjs"

export async function POST(request: Request){

    await dbConnect()

    try {
        
        const {name, username, password} = await request.json()

        const validatedUserSchema = SignupSchema.safeParse({
            name,
            username,
            password
        })

        console.log(validatedUserSchema);
        if(!validatedUserSchema.success){
            const zodError = validatedUserSchema.error.issues[0].message;
            return Response.json({
                success: false,
                message: zodError
            }, {status: 400})
        }

        const exitingUser = await UserModel.findOne({username})
        if(exitingUser){
            return Response.json({
                success: false,
                message: "User with same username already exist."
            }, {status: 400})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await UserModel.create({
            name,
            username,
            password: hashedPassword
        })

        return Response.json({
            success: true,
            message: "User registerd successfully."
        }, {status: 200})

    } catch (error) {
        return Response.json({
            success: false,
            message: "Error while registering."
        }, {status: 500})
    }    
}