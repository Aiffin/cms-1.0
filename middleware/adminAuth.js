const { StatusCodes } = require("http-status-codes")

const adminAuth = async(req,res,next)=>{
    try {
        
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message})
    }
}

module.exports=adminAuth