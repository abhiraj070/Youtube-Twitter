import { asyncHandler } from "../utils/asynchandler";
import { Likes } from "../models/likes.models"
import { ApiResponse } from "../utils/ApiResponse";

const toggleVideoLike= asyncHandler(async(req,res)=>{
    const user_id= req.user._id
    const video_id= req.params.videoId
    const isAlreadyLiked= await Likes.findOne({likedBy: user_id, video: video_id})
    let result;
    if(!isAlreadyLiked){
        result= Likes.create({
            likedBy: user_id,
            video: video_id,
        })
    }
    else{
        result= await Likes.findOneAndDelete({likedBy: user_id, video: video_id})
    }

    return res
    .status(200)
    .json(new ApiResponse(200,result,"Toggled the Like"))
})

const toggleCommentLike= asyncHandler(async(req,res)=>{
    const user_id= req.user._id
    const comment_id= req.params.commentId
    const isAlreadyLiked= await Likes.findOne({likedBy: user_id, comment: comment_id})
    let result;
    if(!isAlreadyLiked){
        result= Likes.create({
            likedBy: user_id,
            comment: comment_id,
        })
    }
    else{
        result= await Likes.findOneAndDelete({likedBy: user_id, comment: comment_id})
    }

    return res
    .status(200)
    .json(new ApiResponse(200,result,"Toggled the Like"))
})

const toggleTweetLike= asyncHandler(async(req,res)=>{
    const user_id= req.user._id
    const Tweet_id= req.params.TweetId
    const isAlreadyLiked= await Likes.findOne({likedBy: user_id, tweet: Tweet_id})
    let result;
    if(!isAlreadyLiked){
        result= Likes.create({
            likedBy: user_id,
            tweet: Tweet_id,
        })
    }
    else{
        result= await Likes.findOneAndDelete({likedBy: user_id, tweet: Tweet_id})
    }

    return res
    .status(200)
    .json(new ApiResponse(200,result,"Toggled the Like"))
})

const getLikedVideos= asyncHandler(async(req,res)=>{
    const user_id= req.user._id
    const allLiked= await Likes.find({likedBy: user_id})
    return res
    .status(200)
    .json(new ApiResponse(200,allLiked,"Fetched all Liked videos"))
})


export {toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideos}