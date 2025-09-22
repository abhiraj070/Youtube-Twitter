import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { Comment } from "../models/comment.models.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllComments= asyncHandler(async (req,res)=>{
    const video_id= req.params?.videoId
    if(!video_id){
        throw new ApiError(500,"Somthing went wrong int he url")
    }
    const comments= await Comment.find({video: video_id}).populate("owner","username fullName").sort({createdAt:-1})
    //here what populate does is in owner field in comments model there is only the id of the user posted that comment. by using populate there will be an extra field showing its username, which saves an extra API call from the frontend to get the username
    //sorted here will sort the returned array in decending order(newest comes first) because of createdAt=-1.

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            comments,
            "Comments recived successfully"
        )
    )
})

const addComment= asyncHandler(async (req,res)=>{
    const {content} =req.body
    if(!content){
        throw new ApiError(400,"Comment is empty")
    }
    const video_id= req.params?.videoId
    if(!video_id){
        throw new ApiError(500,"Somthing went wrong int he url")
    }
    const user_id= req.user?._id
    const commentCreated= await Comment.create({
        content: content,
        owner: user_id,
        video: video_id
    })
    if(!commentCreated){
        throw new ApiError(500,"Error while storing the comment in the database")
    }

    return res.status(201).json(new ApiResponse(201,commentCreated,"Comment posted"))
})

const updateComment= asyncHandler(async (req,res)=>{
    const comment_id=req.params?.commentId
    if(!comment_id){
        throw new ApiError(500,"Somthing went wrong int he url")
    }
    const newComment= req.body.content
    if(!newComment){
        throw new ApiError(400,"Comment is Empty")
    }
    const commentupdated= await Comment.findByIdAndUpdate(
        comment_id,
        {
            content: newComment
        },
        {
            new: true
        }
    )
    return res
    .status(200)
    .json(new ApiResponse(200,commentupdated,"Comment is updated"))
})

const deleteComment= asyncHandler(async (req,res)=>{
    const comment_id= req.params?.commentId
    const deleteComment=await Comment.findByIdAndDelete(comment_id) //here deleteComment will store the entire comment document before it was deleted. if the comment is not present it will return null
    if(!deleteComment){
        throw new ApiError(400,"Comment not found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,deleteComment,"Deleted comment Successfully"))
})


export { addComment, getAllComments, updateComment, deleteComment }
