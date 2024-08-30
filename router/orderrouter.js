const express=require("express")
const { isauth } = require("../middleware/isauth")
const { createorder, updateorder, deleteorder, getorders } = require("../controler/ordercontroller")
const orderrouter=express.Router()
orderrouter.post("/create",isauth,createorder)
orderrouter.put("/update/:id",isauth,updateorder)
orderrouter.delete("/delete/:id",isauth,deleteorder)
orderrouter.get("/allorders",isauth,getorders)
module.exports=orderrouter