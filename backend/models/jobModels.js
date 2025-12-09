import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    company:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    salaryRange:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{
    timestamps:true
})
export const Job =mongoose.model("Job",jobSchema)