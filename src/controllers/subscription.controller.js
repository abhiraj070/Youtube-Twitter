import { Subscription } from "../models/subscription.models";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asynchandler";

const toggleSubscription= asyncHandler(async (req,res) => {
    const { channelId }= req.params
    const userId= req.user_id
    const isAlreadySubscribed= await Subscription.findOne({subscriber: userId, channel: channelId})
    let result
    if(isAlreadySubscribed){
        result= await Subscription.findOneAndDelete({subscriber: userId, channel: channelId})
    }
    else{
        result= await Subscription.create({
            subscriber: userId,
            channel: channelId
        })
    }
    return res
    .status(200)
    .json(new ApiResponse(200, result, "Subscription reversed"))
})

const getUserChannelSubscribers= asyncHandler(async (req,res) => {
    const { channelId }= req.params
    const subscribers= await Subscription.find({channel: channelId})
    return res
    .status(200)
    .json(new ApiResponse(200,subscribers,"channel Subscribers fectched successfully"))
})

const getSubscribedChannels= asyncHandler(async (req,res) => {
    const { channelId }= req.params
    const subscribedTo= await Subscription.find({subscriber: channelId})
    return res
    .status(200)
    .json(new ApiResponse(200,subscribedTo,"Subscribed channels fectched successfully"))
})

export {toggleSubscription, getUserChannelSubscribers, getSubscribedChannels}