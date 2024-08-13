import { uploadImage } from "@/lib/uploadCloudynary";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const formData = await req.formData()
    
    const image = formData.get('image') as unknown as File

    const data = await uploadImage(image, "whishper/users")
    
    return NextResponse.json({msg: data}, {status: 200})
}