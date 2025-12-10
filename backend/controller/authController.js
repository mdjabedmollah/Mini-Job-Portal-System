import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModels.js";
export const Regiter = async (req, res) => {
  try {
    const { name, email, password, skills, experience, role } = req.body;
    if (!name || !email || !password || !skills || !experience || !role) {
      return res.status(400).json({
        success: false,
        message: "All field are requied",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hash = bcrypt.hashSync(password, 10);
    const newUser =await  User.create({
      name,
      email,
      password:hash,
      skills,
      experience,
    // allow user -> 'user'; admin you can manually create from Postman

      role:role || "user",
    });
    const token =jwt.sign(
        {id:newUser._id,role:newUser.role},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}

    )
    res.status(201).json({
        success:true,
        token,
        user:{
            id:newUser._id,
            name:newUser.name,
            role:newUser.role,
            email:newUser.email
        }
    })

  } catch (error) {
    console.error("register error ",error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
         return res.status(400).json({
            success:false,
             message: "Invalid credentials" });
        }
        const Ismatch=bcrypt.compareSync(password,user.password);
        if(!Ismatch){
             return res.status(400).json({
            success:false,
             message: "Invalid credentials" });
        }
        
        const token =jwt.sign(
        {id:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}

    )
    return res.status(200).json({
        success:true,
         user: { id: user._id, name: user.name, role: user.role, email: user.email },
    
    })

        
    } catch (error) {
         console.error("Login error ",error);
    res.status(500).json({ message: "Server error" });
  }
    
}

