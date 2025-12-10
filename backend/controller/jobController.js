import { Job } from "../models/jobModels.js";

export const JobAdmin = async (req, res) => {
  try {
    const { title, description, company, location, salaryRange } = req.body;
    if (!title || !description || !company || !location || !salaryRange) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }
    const job = await Job.create({
      title,
      description,
      company,
      location,
      salaryRange,
      createdBy: req.user.id,
    });
    return res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log("job erro ", error);
    return res.status(500).json({
      success: false,
      message: "sever error ",
    });
  }
};

export const allJob = async (req, res) => {
  try {
    const job = await Job.find().sort({ createdAt: -1 });
    if (!job || job.lenth === 0) {
      return res.status(400).json({
        success: false,
        message: "Job not found",
      });
    }
    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log("all job erro ", error);
    return res.status(500).json({
      success: false,
      message: "sever error ",
    });
  }
};

export const JobId = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(400).json({
        success: false,
        message: "Job not found",
      });
    }
    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log("Job id error ", error);
    return res.status(500).json({
      success: false,
      message: "sever error ",
    });
  }
};

export const Update = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      return res.status(400).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log("Job Update ", error);
    return res.status(500).json({
      success: false,
      message: "sever error ",
    });
  }
};

export const jobDelete = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(400).json({
        success: false,
        message: "Job not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Job deleted",
    });
  } catch (error) {
    console.log("Job delete ", error);
    return res.status(500).json({
      success: false,
      message: "sever error ",
    });
  }
};
