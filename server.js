const express=require("express")
const connectDB = require("./configuration/config")
const shirtrouter = require("./router/productrouter")
const userrouter = require("./router/userrouter")
const app=express()
const port=5000
connectDB()
app.use(express.json())
app.use("/api",shirtrouter)
app.use("/users",userrouter)
app.listen(port,()=>{
  console.log("sever is runing")  
})



