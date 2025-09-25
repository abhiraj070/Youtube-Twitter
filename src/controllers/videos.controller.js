import mongoose, {isValidObjectId} from "mongoose"
import {asyncHandler} from "../utils/asynchandler.js"
import {Video} from "../models/video.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const publishAVideo= asyncHandler(async(req,res)=>{
    const user_id= req.user._id
    if(!isValidObjectId(user_id)){
        throw new ApiError(400,"unauthorised Request")
    }
    const videoLocalPath= req.files?.videoFile[0]?.path
    const thumbnailLocalPath= req.files?.thumbnail[0]?.path
    const videoOnCloudinary=await uploadOnCloudinary(videoLocalPath)
    const {title, description, duration}= req.body
    if(!videoOnCloudinary){
        throw new ApiError(500,"Something went wrong while uploading on cloudinary")
    }
    const thumbnailOnCludinary= await uploadOnCloudinary(thumbnailLocalPath)
    if(!thumbnailOnCludinary){
        throw new ApiError(500,"Something went wrong while uploading on cloudinary")
    }

    const createVideoDocument= await Video.create({
        owner: user_id,
        videoFile: videoOnCloudinary,
        thumbnail: thumbnailOnCludinary,
        title: title,
        description: description,
        duration: duration
    })

    if(!createVideoDocument){
        throw new ApiError(500,"Something went wrong while uploading on database")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,createVideoDocument,"Video Published Successfully"))
})

const getVideoById= asyncHandler(async(req,res)=>{
    const video_id= req.params.VideoId
    const videoOnDataBase= await Video.findById(video_id)
    return res
    .status(200)
    .json(new ApiResponse(200,videoOnDataBase,"Video fetched successfully"))
})

const updateVideoDetails= asyncHandler(async(req,res)=>{
    const user_id=req.user._id
    const video_id=req.params.VideoId
    const isOwner= await Video.findOne({owner: user_id, _id: video_id})
    if(!isOwner){
        throw new ApiError(400,"This user cannot edit the video details")
    } 
    const {description, title, duration}= req.body
    if(description || title || duration){
        const updateDetails= await Video.findByIdAndUpdate(
            video_id,
            {
                description,
                duration,
                title
            },
            {
                new: true
            }
        )
    }
    const videoLocalPath= req.files?.videoFile[0]?.path
    if(videoLocalPath){
        const uploadVideo=await uploadOnCloudinary(videoLocalPath)
        if(!uploadVideo){
            throw new ApiError(500,"Something went wrong while uploading video on cloudinary")
        }
    }
    const thumbnailLocalPath= req.files?.thumbnail[0]?.path
    if(thumbnailLocalPath){
        const uploadthumbnail=await uploadOnCloudinary(thumbnailLocalPath)
        if(!uploadthumbnail){
            throw new ApiError(500,"Something went wrong while uploading thumbnail on cloudinary")
        }
    }
    return res
        .status(200)
        .json(new ApiResponse(200,updateDetails,"Details Updated Successfully"))
})

//const grtAllVideos

export {publishAVideo, getVideoById, updateVideoDetails}