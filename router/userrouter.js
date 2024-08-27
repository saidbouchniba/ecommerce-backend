const express=require("express")
const { signUp, signin } = require("../controler/usercontroler")
const { signUpvalidation, validation, signinvalidation } = require("../middleware/validation")
const userrouter=express.Router()
userrouter.post("/signup",signUpvalidation,validation,signUp)
userrouter.post("/signin",signinvalidation,validation,signin)
module.exports=userrouter
