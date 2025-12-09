import jwt from 'jsonwebtoken'
const auth=(req,res,next)=>{
    const authheader =req.headers.authorization
    if(!authheader|| !req.statsWith("Bearer "))
        return res.status(401).json({
    message:"No token ,authorization denied"
    })
    const token =authheader.split("")[1];
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        
    }


    
}