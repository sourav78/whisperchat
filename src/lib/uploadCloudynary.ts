import cloudinary from "./cloudy";

export const uploadImage = async(file:File, folder:string, fileName: string) => {

    const fileSizeLimit = 2 * 1024 * 1024; // 2MB in bytes

    // Check if the file exceeds the size limit
    if (file.size > fileSizeLimit) {
        return Promise.reject(`File size exceeds the limit 2 MB`);
    }

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