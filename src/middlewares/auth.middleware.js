import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model";
export const verifyJWT = asyncHandler(async(res, res,next) => {

   try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
 
    if(!token){
     throw new ApiError(401,"Unauthorized request")
    }
 
     const decodedToken =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
          
      const user = User.findById(decodedToken?._id).select("-select -refreshToken")      
      if(!user){
         throw new ApiError(401, "Invalid Access Token")
      }
          req.user = user;
          next()
   } catch (error) {
      throw new ApiError(401, error?.message || "Something went wrong")
   }
       
})