import dbConnect from "@/lib/db";
import { uploadImage } from "@/lib/uploadCloudynary";
import UserModel from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    
    await dbConnect()

    try{
        const formData = await req.formData()
    
        const image = formData.get('image') as unknown as File
        const name = formData.get('name')
        const username = formData.get('username') as string
        const bio = formData.get('bio')

        
        if(!name){
            return NextResponse.json({
                success: false,
                message: "Name should not be empty"
            }, {status: 404})
        }
        
        if(!image){
            await UserModel.findOneAndUpdate({username}, {
                name,
                bio
            })
        }else{
            const data:any = await uploadImage(image, "whishper/users", username)
            await UserModel.findOneAndUpdate({username}, {
                name,
                bio,
                avatar: data.secure_url
            })
        }

        return NextResponse.json({
            success: true,
            message: "Profile complted"
        }, {status: 201})

    }catch(error){
        console.log(error);
        
        return Response.json({
            success: false,
            message: "Error on onboarding."
        }, {status: 500})
    }
}