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

//const getAllVideos

const deleteVideo= asyncHandler(async(req,res)=>{
    const user_id= req.user._id
    const video_id= req.params.VideoId
    const isOwner=await Video.findOne({owner: user_id, _id: video_id})
    let deletedVideo;
    if(isOwner){
        deletedVideo=await Video.findByIdAndDelete(video_id)
        if(!deletedVideo){
            throw new ApiError(400,"The user is not found")
        }
        return res
        .status(200)
        .json(new ApiResponse(200,deletedVideo,"The video is Successfully deleted"))
    }
    return res
        .status(400)
        .json(new ApiResponse(400,{},"The video is cannot be deleted"))
})

const togglePublish= asyncHandler(async(req,res)=>{
    const video_id= req.params.VideoId
    const video= await Video.findById(video_id)
    if(!video){
        throw new ApiError(400,"Video not Found")
    }
    const isTrue= video.isPublished
    let isUpdated
    if(isTrue){
        isUpdated= await Video.findByIdAndUpdate(
            video_id,
            {
                isPublished:false
            },
            {
                new: true
            }
        )    
    }
    else{
        isUpdated= await Video.findByIdAndUpdate(
            video_id,
            {
                isPublished: true
            },
            {
                new: true
            }
        )
    }
    return res
    .status(200)
    .json(new ApiResponse(200,isUpdated,"Publish button is toggled"))
})

export {publishAVideo, getVideoById, updateVideoDetails, deleteVideo, togglePublish}