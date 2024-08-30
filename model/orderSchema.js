const mongoose=require("mongoose")
const orderSchema=new mongoose.Schema({
    cart:Array,
    total:Number,
    status:{type:String,default:"pending"},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"users"}

})
module.exports=mongoose.model("orders",orderSchema)