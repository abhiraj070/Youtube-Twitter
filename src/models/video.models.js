import mongoose,{Schema} from 'mongoose'
import mongooseaggregatepaginate from 'mongoose-aggregate-paginate-v2'

const videoschema= Schema(
    {
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        videoFile:{
            type: String,
            required: true
        },
        thumbnail:{
            type: String,
            required:true
        },
        title: {
            type: String,
            required:true
        },
        description: {
            type:String,
            required:true
        },
        duration: {
            type: Number,
            required: true
        },
        views:{
            type: Number,
            default:0,
        },
        isPublished:{
            type: Boolean,
            default: true
        }
    },{timestamps: true}
)

videoschema.plugin(mongooseaggregatepaginate); //plugin is a resuable function which we can attach to the schema to extend its functionality

export const Video=mongoose.model("Video",videoschema)