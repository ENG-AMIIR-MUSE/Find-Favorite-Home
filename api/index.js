import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
// configuring the dotenv
dotenv.config()

// connecting to the mongodb
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to the database ...")
}).catch((err)=>{
    console.log(err)
})
const app =  express()

app.use(express.json())
// use  express.json() to send a json data to the server 
const PORT  = 3000;
app.listen(PORT,(req,res)=>{
    console.log(`app is listening on port ${PORT}`)
})