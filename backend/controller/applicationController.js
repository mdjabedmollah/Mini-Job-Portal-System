import { Application } from "../models/applicationSchema.js"
import { Job } from "../models/jobModels.js"

export const ApplyUser=async(req,res)=>{
    try {
        const jobId=req.params.jobId
        const job=await Job.findById(jobId)
        if(!job){
            return res.status(400).json({
                success:false,
                message:"Job not found"
            })
        }
        const existing=await Application.findOne({
            job:jobId,user:req.user.id
        })
        if(!existing){
        return res.status(400).json({
            success:false,
             message: "You already applied to this job" });

        }
    } catch (error) {
        
    }
}