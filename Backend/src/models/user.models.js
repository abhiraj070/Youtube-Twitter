import mongoose,{Schema} from 'mongoose' //the name inside {} should exactly be same as the one being exported.
import bcrypt from 'bcrypt'  //we use {} to import when default is not used
import jwt from 'jsonwebtoken'

const userschema= Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,  //removes any extra space at the end or front for the username before saving it in mongodb
            index: true,  //to make the object more serchable
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,  
        },
        fullName: {
            type: String,
            required: true,
            index: true,  
            trim: true,
        },
        avatar:{
            type: String,
            required: true,
        },
        coverImage:{
            type: String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            }
        ],
        password:{
            type: String,
            required: [true,"Password is required"],
        },
        refreshToken:{
            type: String,
        }
    },{timestamps: true}
)

userschema.pre("save",async function(next){  //.pre is a middleware offered by mongoose which says " before saving the document run the function ", also we didn't used arrow function here because it does not contain the current context refernce or this cant be used there.
   if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,10)  //here bcrypt.hash() is encrypting the pasword
    next()
})

userschema.methods.isPasswordCorrect= async function(password){ //it adds a method to the userschema
    return await bcrypt.compare(password,this.password)
}//schema.method is a object where we can define methods for documents created from that schema
//here passsword will be compared to this.password which is the encrypted one stored in the database.

userschema.methods.generateAccessToken=function(){
    return jwt.sign(  //jwt.sign helps create a token which will in future be used to check whom to give data and whom to not(jiske paas token hoga usko data de denge) 
        {  //jwt requires some parameters:
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

userschema.methods.generateRefreshToken= function(){
    return jwt.sign(  
        {  //jwt requires some parameters:
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User= mongoose.model("User",userschema) //in these type of imports since there is no default keyword while importing this file anywhere we will have to use {}.