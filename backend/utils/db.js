import mongoose from "mongoose";
export const DBconnection =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
         console.log("Data base successfully connected")
    } catch (error) {
        console.log("data base error ",error)
    }
}

