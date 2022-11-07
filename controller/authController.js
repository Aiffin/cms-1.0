const { StatusCodes } = require("http-status-codes")
const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const {createAccessToken} = require('../util/token')
const jwt = require('jsonwebtoken')
const regTemplate =require('../template/regTemplate')
const sendMail = require('../middleware/mail')

const authController = {
    register:async(req,res)=>{
        try{

            const {name,email,mobile,password} = req.body

            const encPassword =await bcrypt.hash(password,10)

            const newUser =await User.create({
                name,
                email,
                mobile,
                password:encPassword
            })

            const template =regTemplate(name,email)
            const subject =`Confirmation or registration with cms-v1-0`
            await sendMail(email,subject,template)

            res.status(StatusCodes.OK).json({msg:"User registered successfully",data:newUser})

        }catch(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
        }
    },
    login:async(req,res)=>{
        try{
            const {email,password} =req.body

            //user email exists or no

            const extUser = await User.findOne({email})
                if(!extUser)
                    return res.status(StatusCodes.NOT_FOUND).json({msg:"User does'nt exists"})

            //compare password
            const isMatch = await bcrypt.compare(password,extUser.password)
                if(!isMatch)
                  return res.status(StatusCodes.BAD_REQUEST).json({msg:"password aren't match"})

            //generate token
            const accessToken = createAccessToken({_id:extUser._id})

            //save token in cookies
            res.cookie('refreshToken',accessToken,{
                httpOnly:true,
                signed:true,
                path:`/api/v1/auth/refreshToken`,
                maxAge:1*24*60*60*1000
            })

            res.json({msg:"login successful",accessToken})

        }catch(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
        }
    },
    logout:async(req,res)=>{
        try{
            res.clearCookie('refreshToken',{ path:`/api/v1/auth/refreshToken`})
            res.json({msg:"logout successfully"})
        }catch(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
        }
    },
    refreshToken:async(req,res)=>{
        try{
            const rf = req.signedCookies.refreshToken

            if(!rf)
                return res.status(StatusCodes.BAD_REQUEST).json({msg:"Session Expired ,Login Again"})

                //valid user id or no

                jwt.verify(rf,process.env.TOKEN_SECRET,(err,user)=>{
                    if(err)

                    return res.status(StatusCodes.BAD_REQUEST).json({msg:"Invalid Acess Token..Login Again"})

                    // valid Token
                    const accessToken=createAccessToken({id:user._id})
                    res.json({accessToken})
                })
            // res.json({rf})
    
        }catch(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
        }
    },
    resetPassword:async(req,res)=>{
        try{
            const id=req.user.id

            const {oldPassword,newPassword} =req.body

            //read user data
            const extUser=await User.findById({_id:id})
                if(!extUser)
                    return res.status(StatusCodes.NOT_FOUND).json({msg:"User doesn't Match"})

            //compare password
            const isMatch=await bcrypt.compare(oldPassword,extUser.password)
                if(!isMatch)
                    return res.status(StatusCodes.BAD_REQUEST).json({msg:"old password aren't match"})

            //generate newpASSWOrd HASH
            const passwordHash =await bcrypt.hash(newPassword,10)

            //update Logic
            const output=await User.findByIdAndUpdate({_id:id},{password:passwordHash})

            //output res
            res.json({msg:"user password reset success",output})

        }catch(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
        }
    }
}

module.exports=authController