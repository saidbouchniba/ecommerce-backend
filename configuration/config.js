const mongoose=require("mongoose")
const connectDB=async()=>{
    try {
    await mongoose.connect("mongodb+srv://saidbouchniba8:QAm98Ts7K99vUJg9@said.y7vnc.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=said")
    console.log("data base is connected");
    } catch (error) {
        console.log("data base is not connected");
    }
}
module.exports=connectDB