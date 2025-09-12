import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// multer ka use karke file ko user se lenge aur apne local server pe upload kar denge. phir cloudinary ko local file ka path deke usse waha pe upload kar denge.
const uploadOnCloudinary= async (localFilePath)=> {
    try {
        if(!localFilePath) return null;
        const uploadResult = await cloudinary.uploader.upload(localFilePath,{resource_type: "auto"})
        return uploadResult;
    } catch (error) {
        fs.unlinkSync(localFilePath)  //removes the locally saved file (on Public folder) beacuse the upload is failed
        return null
    }
}

export {uploadOnCloudinary}