//controller is a function where we handle the request just after middlewares complete their jobs. 

import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import JWT from 'jsonwebtoken'

const test=()=>{
    console.log("3");
}
const generateAccessAndRefreshTokens= async (userId)=>{
    try {
        const user=await User.findById(userId)

        const refreshToken= user.generateRefreshToken()
        const accessToken= user.generateAccessToken()

        user.refreshToken=refreshToken// user is a object of entire document created for the userId. in the document there is a field refreshToken(usershcema), that's why we are able to access it here
        await user.save({validateBeforeSave: false}) //saving the above changes in the database

        test()
        
        return {refreshToken, accessToken}

    } catch (error) {
        throw new ApiError(500,"Somthing went wrong will generation access and refresh tokens")
    }

}

//take user details from frontend
//varify details- not empty
//check if user already exists- by email and username.
//verify avatar- is present or not
//store avatar and image in cloudinary
//push the user details in data base
//remove password and refresh token field from response
//check for user creation
//return res



const registerUser = asyncHandler( async (req,res)=>{
    //1
    const {email, username, fullName, password}= req.body
    console.log("1");
    
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
    const isalreadyuser=await User.findOne(  //findone is used to fint the first document that matches the condition and used await beacuse database is in different continent
        {
            $or: [{username},{email}]  //$or is an "or" operator in mongoDB which lets ussearch for documents where atleast one condition is true.
        }  
    )
    //console.log(isalreadyuser); this returns null when no user found
    //if any of the email and the username is found in the database the variable isalreadyuser will store the entire user document with all its information.

    if(isalreadyuser) throw new ApiError(409,"User with same email id or username exists")

    //4
    const avatarlocalpath= req.files?.avatar[0]?.path //when the req goes through the multer middleware it attaches some files to the req which stores information about the files it stored in the local server
    //const coverImagelocalpath= req.files?.coverImage[0]?.path =>> finding path like this was causing trouble beacuse there is no check for coverImagelocalpath in it. although we can write a check just like the avatarlocalpath but there isa classical method to this.
    let coverImagelocalpath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImagelocalpath=req.files.coverImage[0].path
    }
    
    

    if(!avatarlocalpath) throw new ApiError(400,"Avatar file is required")
    //console.log(req.files);
    //req.files gives
    /* {
        avatar: [
            {
            fieldname: 'avatar',
            originalname: 'mypic.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: './Public/temp',
            filename: 'mypic.jpg',
            path: 'Public\\temp\\mypic.jpg',
            size: 21087
            }
        ],
        coverImage: [
            {
            fieldname: 'coverImage',
            originalname: 'WhatsApp Image 2025-04-05 at 01.14.12_fe5affe3.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: './Public/temp',
            filename: 'WhatsApp Image 2025-04-05 at 01.14.12_fe5affe3.jpg',
            path: 'Public\\temp\\WhatsApp Image 2025-04-05 at 01.14.12_fe5affe3.jpg',
            size: 99532
            }
        ]
        } */
    
    //5
    const avatar=await uploadOnCloudinary(avatarlocalpath)
    const coverImage=await uploadOnCloudinary(coverImagelocalpath) 

    if(!avatar) throw new ApiError(400,"Avatar file is required")

    //6
    const userCreated=await User.create({  //this created an entry in mongodb
        username: username.toLowerCase(),
        fullName,
        avatar: avatar.url,  
        coverImage: coverImage?.url || "",
        email,
        password
    })
    if(!userCreated) throw new ApiError(500,"Something went wrong while regestring the user")
    
    //7
    const responseuser= await User.findById(userCreated._id).select("-password -refreshToken") //disselected the fields which we didn't want to send back to the user as a response

    //8
    if(!responseuser) throw new ApiError(500,"Something went wrong while registering the user")
    
    //9
    return res.status(201).json(
        new ApiResponse(200, responseuser, "User registered successfully")
    )  //res.status is for the HTTP status code and apiresponse if for the application
})

//take username, email, password id from the frontend
//username or email based login
//verify it with the database
//password check
//if present, give the access and refresh token through cookies
//if not throw error


const loginUser = asyncHandler(async (req,res)=>{
    console.log("reached here");
    const {email, username, password}= req.body
    console.log("1");
    test()
    if(!username && !email){
        throw new ApiError(400,"User or Email id is required")
    }

    const user = await User.findOne({
        $or: [{email},{username}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const passwordCheck= await user.isPasswordCorrect(password)

    if(!passwordCheck){
        throw new ApiError(401,"Password is incorrect")
    }

    const {refreshToken,accessToken}= await generateAccessAndRefreshTokens(user._id)
   

    if(!refreshToken||!accessToken){
         throw new ApiError(500, "Something went wrong while generation refresh and access token ")
    }

    const loggedInUser= await User.findById(user._id).select("-password -refreshToken")

    const options={// by doing this the cookie we are about to sent in the next step will be secured: cannot be edited from the frontend, can only be edited from the server.
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in Successfully"
        )
    )
})

const logoutUser= asyncHandler(async(req,res)=>{
    await findByIdAndUpdate( //using this we can update something in database quickly and efficiently
        req.user._id,
        {
            $set: { //set/changes values in database
                refreshToken: undefined
            },
        },
        { //the returned value from here will be updated one.
            new: true
        }
    )
})

const refreshAccessToken= asyncHandler(async (req,res)=>{
    const recivedRefreshToken=req.cookies.refreshToken || req.body.refrehToken
    if(!recivedRefreshToken){
        throw new ApiError(402,"unauthroised request")
    }
    const decodedToken=JWT.verify(recivedRefreshToken,process.env.REFRESH_TOKEN_SECRET) //this helps to verify that the refreshtoken recived is created by the same jwt.sign(patternwaise).recived refresh token can be old or new here
    
    const user= await User.findById(decodedToken?._id)

    if(!user){
        throw new ApiError(402,"Invalid refresh token")
    }

    if(recivedRefreshToken!==user?.refreshToken){ //this helps here that the refresh token recived is new or not/ same as the one in DB.
        throw new ApiError(401,"refresh token is expired or used")
    }

    const options={
        httpOnly: true,
        secure: true
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)

    return res
    .status(200)
    .cookie("refrehToken",refreshToken,options)
    .cookie("accessToken",accessToken,options)
    .json(
        new ApiResponse(
            201,
            {
                refrehToken, accessToken
            },
            "Access Token Refreshed"
        )
    )
})

const changeCurrentPsaaword= asyncHandler(async (req,res)=>{
    const {oldPassword, newPassword, confirmPassword}= req.body

    if(!oldPassword || !newPassword || !confirmPassword){
        throw new ApiError(402,"All the fields are required")
    }

    if(newPassword!==confirmPassword){
       throw new ApiError(401,"New password doesn't matches confirm Password")
    }

    const user= await User.findById(req.user?._id)
    if(!user){
        throw new ApiError(401,"Unauthorised Request")
    }

    const isPasswordCorrect=user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(401,"Old password is incorrect")
    }

    user.password=newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            201,
            {},
            "Password is updated"
        )
    )
})

const getCurrentUser= asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(
        new ApiResponse(200,
        req.user,
        "current user feched Successfully"
    ))
})

const updateAccountDetails= asyncHandler(async(req,res)=>{
    const {fullName, email}=req.body
    if(!fullName && !email){
       throw new ApiError(401,"Either email or full name is empty")
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                fullName: fullName,
                email: email
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(
            201,
            user,
            "Account details has been updated"
        )
    )
})

const updateUserAvatar= asyncHandler(async(req,res)=>{
    const avatarlocalpath= req.files?.avatar[0]?.path

    if(!avatarlocalpath){
        throw new ApiError(401,"Avatar is missing")
    }

    const avatar=await uploadOnCloudinary(avatarlocalpath)

    if(!avatar.url){
        throw new ApiError(501,"Error while uploading avatar")
    }

    const user= await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Avatar image updated successfully")
    )
})

const updateUserCoverInage= asyncHandler(async(req,res)=>{
    const coverImagelocalpath= req.files?.coverImage[0]?.path

    if(!coverImagelocalpath){
        throw new ApiError(401,"Avatar is missing")
    }

    const avatar=await uploadOnCloudinary(coverImagelocalpath)

    if(!avatar.url){
        throw new ApiError(501,"Error while uploading Cover Image")
    }

    const user= await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json(
        201,
        user,
        "Cover Image is Updated"
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPsaaword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverInage
}