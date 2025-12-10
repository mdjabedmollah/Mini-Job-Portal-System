import express from 'express'
import { login, Regiter } from '../controller/authController.js'
import {auth} from '../middleware/auth.js'
import { User } from '../models/userModels.js'
const router=express.Router()
router.post('/register',Regiter)
router.post('/login',login)
router.get('/me',auth,async(req,res)=>{
 try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

export default router