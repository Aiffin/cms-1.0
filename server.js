require('dotenv').config()

const express = require('express');
const cors = require('cors');
const cookieParser=require('cookie-parser');
const assert = require('assert');
const fileUpload = require('express-fileupload');

//port
const PORT =process.env.PORT

//ref
const app = express()

//body-parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//middleware
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true
}))

//route
const authRoute = require('./route/authRoute')
const userRoute = require('./route/userRoute')

//primary route
app.use(`/api/v1/auth`,authRoute)
app.use(`/api/v1/user`,userRoute)

const start =async()=>{
    try {
        app.listen(PORT,()=>{
            console.log(`server is listening @ http://localhost:${PORT}`)
        })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
    }
}

start()