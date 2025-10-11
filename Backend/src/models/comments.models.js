import mongoose, {Schema} from "mongoose";

const commentSchema= Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required:true
    },
    video: {  //while creating a document in database videoId will be given
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
},{timestamps: true})

export const Comment=mongoose.model("Comment",commentSchema)