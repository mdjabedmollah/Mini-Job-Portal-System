import jwt from 'jsonwebtoken'
export const auth=(req,res,next)=>{
    const authheader =req.headers.authorization
    if(!authheader|| !req.statsWith("Bearer "))
        return res.status(401).json({
    message:"No token ,authorization denied"
    })
    const token =authheader.split(" ")[1];
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user =decoded; // {id,role}
        next()
    } catch (error) {
        return res.status(401).json({
            message:"Token is not valid"
        })
    }
    
}
export const isAdmin =(req,res,next)=>{
   try {
     if(req.user.role!=="admin"){
        return res.status(401).json({
    message:"Only admin allowed"
    })
    next()
}
   } catch (error) {
     return res.status(401).json({
            message:"Token is not valid"
        })
   }
}

