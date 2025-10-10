import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Playlist } from "../models/playlist.models.js";

const createPlaylist= asyncHandler(async (req,res) => {
    const user_id= req.user._id
    const {name, description}= req.body
    if(!name || !description){
        throw new ApiError(401,"Ether Name or Description are empty")
    }
    const video_id=req.params?.videoId
    const playlistcreated=await Playlist.create({
        name: name,
        description: description,
        owner: user_id,
        videos: video_id
    })
    if(!playlistcreated){
        throw new ApiError(501,"Something went wrong while creating the playlist")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,playlistcreated,"Playlist created Successfully"))
})

const getUserPlaylist= asyncHandler(async (req,res) => {
    const user_id= req.params.userId
    const userPlaylist= await Playlist.findOne({owner: user_id})
    if(!userPlaylist){
        throw new ApiError(404,"No Playlist found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,userPlaylist,"Playlist fetched Successfully"))
})

const getPlaylistById= asyncHandler(async (req,res) => {
    const playlist_id= req.params.playlistId
    const playlist= await Playlist.findById(playlist_id)
    if(!playlist){
        throw ApiError(404,"No Playlist found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,"Playlist fetched by Id successfully"))
})

const addVideoToPlaylist= asyncHandler(async (req,res) => {
    const {videoId, playlistId}=req.params
    const updatedplaylist= await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $push: {  //this pushes the video id in the array of objects (videos in playlist schema)
                videos: videoId
            }
        },
        {
            new: true
        }
    )
    if(!updatedplaylist){
        throw new ApiError(404,"Playlist not found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,updatedplaylist,"video added to Playlist Successfully"))
})

const deleteVideofromPlaylist= asyncHandler(async (req,res) => {
    const {videoId, playlistId}= req.params
    const user_id= req.user._id
    const isOwner= await Playlist.findOne({owner: user_id, _id: playlistId})
    if(!isOwner){
        throw new ApiError(400,"this user cannot delete video from this playlist")
    }
    const updatedplaylist= await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull: {
                videos: videoId
            }
        },
        {
            new: true
        }
    )
    if(!updatedplaylist){
        throw new ApiError(404,"Playlist not found")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,updatedplaylist,"video deleted from the Playlist Successfully"))
})

const deletePlaylist= asyncHandler(async (req,res) => {
    const {playlistId}=req.params
    const user_id= req.user._id
    const isOwner= await Playlist.findOne({owner: user_id, _id: playlistId})
    if(!isOwner){
        throw new ApiError(400,"this user cannot delete the playlist")
    } 
    const deletedPlaylist= await Playlist.findByIdAndDelete(playlistId)
    return res
    .status(200)
    .json(new ApiResponse(200,deletedPlaylist,"video added to Playlist Successfully"))
})

const updatedplaylistDetails= asyncHandler(async (req,res) => {
    const playlist_id= req.params.playlistId
    const {description, name}= req.body
    const updatedplaylist= await Playlist.findByIdAndUpdate(
        playlist_id,
        {
            name: name,
            description: description
        },
        {
            new: true
        }
    )
    if(!updatedplaylist){
        throw new ApiError(404,"Playlist doesn't exists")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,updatedplaylist,"video added to Playlist Successfully"))
})


export {updatedplaylistDetails, deleteVideofromPlaylist, addVideoToPlaylist, getPlaylistById, getUserPlaylist, createPlaylist, deletePlaylist}

