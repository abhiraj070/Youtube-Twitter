import mongoose,{Schema} from "mongoose";
import { Video } from "./video.models";

const likesSchema= Schema({
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    Video: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    comment:{ //liked comment
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    tweet: {  //liked tweet
        type: Schema.Types.ObjectId,
        ref: "Tweet"
    }
},{timestamps:true})

export const Likes= mongoose.model("Likes",likesSchema)