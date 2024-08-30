const express=require("express")
const { addshirt, getshirts, deleteshirt, updateshirt, getoneshirt } = require("../controler/productscontroler")
const shirtrouter=express.Router()
shirtrouter.post("/add",addshirt)
shirtrouter.get("/allshirt",getshirts)
shirtrouter.delete("/deleteshirt",deleteshirt)
shirtrouter.put("/update",updateshirt)
shirtrouter.get("/getone/:id",getoneshirt)
module.exports=shirtrouter