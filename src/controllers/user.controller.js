import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiErrors.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//take user details from frontend
//varify details- not empty
//check if user already exists- by email and username
//verify avatar- is present or not
//store avatar and image in cloudinary
//push the user details in data base
//remove password and refresh token field from response
//check for user creation
//return res

const registeruser = asyncHandler( async (req,res)=>{
    //1
    const {email, username, fullName, password}= req.body

    //2
    if(!email){
        throw new ApiError(400,"Email is required")
    }
    if(!username){
        throw new ApiError(400,"Username is required")
    }
    if(!fullName){
        throw new ApiError(400,"Fullname is required")  //beacuse apierror is a class, that's why we need to use 'new'.
    }
    if(!password){
        throw new ApiError(400,"password is required")
    }
    /*if([email,username,password,fullName].some((fields)=>field?.trim==="")){
    } throw new ApiError(400)*/

    //3
    const isalreadyuser=User.findone(  //findone is used to fint the first document that matches the condition
        {
            $or: [{username},{email}]  //$or is an "or" operator in mongoDB which lets ussearch for documents where atleast one condition is true.
        }  
    )
    if(!isalreadyuser) throw new ApiError(409,"User with same email id or username exists")

    //4
    const avatarlocalpath= req.files?.avatar[0]?.path //when the req goes through the multer middleware it attaches some files to the req which stores information about the files it stored in the local server
    const coverImagelocalpath= req.files?.avatar[0]?.path
    if(!avatarlocalpath) throw new ApiError(400,"Avatar file is required")
    
    //5
    const avatar=await uploadOnCloudinary(avatarlocalpath)
    const coverImage=await uploadOnCloudinary(coverImagelocalpath) 
    if(!avatar) throw new ApiError(400,"Avatar file is required")

    //6
    const userCreated=await User.create({  //this created an entry in mongodb
        username: username.lowercase,
        fullName,
        avatar: avatar.url,  
        coverImage: coverImage?.url || "",
        email,
        password
    })
    if(!userCreated) throw new ApiError(500,"Something went wrong while regestring the user")
    
    //7
    const responseuser =await User.findById(userCreated._id).select("-password -refreshToken") //disselected the fields which we didn't want to send back to the user as a response

    //8
    if(!responseuser) throw new ApiError(500,"Something went wrong while registering the user")
    
    //9
    return res.status(201,json(
        new ApiResponse(200, responseuser, "User registered successfully")
    ))
})

export {registeruser}