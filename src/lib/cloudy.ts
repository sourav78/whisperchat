import cloudinary from 'cloudinary'

cloudinary.v2.config({
    cloud_name: process.env.CLOUDY_NAME,
    api_key: process.env.CLOUDY_API_KEY,
    api_secret: process.env.CLOUDY_API_SECRET,
    secure: true,
});

export default cloudinary