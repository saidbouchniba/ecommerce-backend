const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    address:{type:String,required:true},
    phone:{type:Number,required:true},
    cart:{type:Array,default:[]},
})
module.exports=mongoose.model("users",userSchema)
