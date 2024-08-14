import cloudinary from "./cloudy";

export const uploadImage = async(file:File, folder:string, fileName: string) => {

    const buffer = await file.arrayBuffer()
    const bytes = Buffer.from(buffer)

    return new Promise(async(resolve, reject) => {
        await cloudinary.v2.uploader.upload_stream({
            resource_type: "auto",
            folder: folder,
            public_id: fileName
        }, async (err, result) => {
            if(err){
                return reject(err.message)
            }
            return resolve(result)
        }).end(bytes)
    })
}