import { errorHandler } from "./error.js"
import  Jwt  from "jsonwebtoken"

export const verifyUser = async(req,res,next)=>{

    const token = req.cookies.accessToken
    if(!token) return next(errorHandler(401,"Anuthorized"))

    Jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(403,"Forbiden"))
        req.user = user
        next()
    })
    
}