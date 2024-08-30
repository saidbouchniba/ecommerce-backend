const express=require("express")
const connectDB = require("./configuration/config")
const shirtrouter = require("./router/productrouter")
const userrouter = require("./router/userrouter")
const orderrouter = require("./router/orderrouter")
const app=express()
const port=5000
connectDB()
app.use(express.json())
app.use("/api",shirtrouter)
app.use("/users",userrouter)
app.use("/order",orderrouter)
app.listen(port,()=>{
  console.log("sever is runing")  
})



