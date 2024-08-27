const mongoose=require("mongoose")
const { title } = require("process")
const shirtSchema=new mongoose.Schema({
title:String,
price:Number,
description:String,
categorie:String,
color:String,
size:Array,
Image:String,
},{
    timestamps:true
})
module.exports=mongoose.model("products",shirtSchema)
