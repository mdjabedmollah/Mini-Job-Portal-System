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
            jobId:jobId,
            userId:req.user.id
        })
        if(existing){
        return res.status(400).json({
            success:false,
             message: "You already applied to this job" });

        }
        const app=await Application.create({
            jobId:jobId,
            userId:req.user.id
        })
        return res.status(200).json(
            {
                success:true,
                app
            }
        )

    } catch (error) {
    console.log("ApplyUser ERROR:", error);
    return res.status(500).json({
        success:false,
        message:error.message   // show real message
    })
}


}

export const ViewAdmin=async(req,res)=>{
    try {
        const jobId=req.params.jobId
        const apps=await Application.find({jobId:jobId})
        .populate("userId","name email skills experience")
        .populate("jobId","title company")

        return res.status(200).json({
            success:true,
            apps
        })
    } catch (error) {
    console.log("ViewAdmin ERROR:", error);
    return res.status(500).json({
        success:false,
        message:error.message
    })
}


}