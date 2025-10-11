import mongoose,{Schema} from "mongoose";

const likesSchema= Schema({
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    video: {
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