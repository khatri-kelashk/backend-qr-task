import mongoose from "mongoose";

export const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: process.env.MONGO_DB || "TestDB"
    })
    .then(() => console.log("Connected to MongoDB") )
    .catch(err => console.log("Error in DB connection->",err))
}