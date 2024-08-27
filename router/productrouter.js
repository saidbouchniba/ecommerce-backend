const express=require("express")
const { addshirt, getshirts, deleteshirt, updateshirt } = require("../controler/productscontroler")
const shirtrouter=express.Router()
shirtrouter.post("/add",addshirt)
shirtrouter.get("/allshirt",getshirts)
shirtrouter.delete("/deleteshirt",deleteshirt)
shirtrouter.put("/update",updateshirt)
module.exports=shirtrouter