import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynchandler.js";
import  JWT  from 'jsonwebtoken';
import { User } from "../models/user.models.js";

export const verifyJWT= asyncHandler(async(req,_)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token){
            throw new ApiError(401, "Unauthorized Request")
        }
    
        const decodedToken=JWT.verify(token,process.env.ACCESS_TOKEN_SECRET) //JWT.verift verifies the token, if it matches then it returns the object which was defined when used JWT.sign().

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
     
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user=user //req is an object which stores req.body, req.params, req.header etc, so here we are just adding another key-value in the object
        next();
    } catch (error) {
        throw new ApiError(401,"Invalid access token")
    }
})
// this ia a middleware that injects user in request so that it can be accessed while loging out the user.