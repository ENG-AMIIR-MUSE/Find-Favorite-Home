import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routers/user-router.js'
import authRouter from './routers/auth-route.js'
import cookieParser from 'cookie-parser'
// configuring the dotenv
dotenv.config()

// connecting to the mongodb
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to the database ...")
}).catch((err)=>{
    console.log(err)
})
const app =  express()
app.use(cookieParser())
app.use(express.json())
// use  express.json() to send a json data to the server 
const PORT  = 3000;
app.listen(PORT,(req,res)=>{
    console.log(`app is listening on port ${PORT}`)
})
// first api test 

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
// creating a middle ware 

app.use((err,req,res,next)=>{
    const statusCode  = err.statusCode || 500
    const message =  err.message  || "internal server error"
    return res.status(statusCode).json({
       success:false,
       statusCode,
        Message:message
    })
})
