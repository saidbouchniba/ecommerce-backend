const users = require("../model/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer=require("nodemailer")
const gp=require("generate-password")
exports.confirmationmail=async(req,res)=>{
    const { email, password, name } = req.body

    try {
        const found = await users.findOne({ email })
        if (found) {
            res.status(400).send({
                Msg: "this user already created"

            })

        } 
        else{
            const token=jwt.sign({...req.body},"ABC123")
            const link=`http://localhost:5000/users/${token}`
            const transporter=nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:"saidbouchniba8@gmail.com",
                    pass:"eqdz acwe drvb jsqs"
                }

            })
            var mailOptions = {
                from: 'saidbouchniba8@gmail.com',
                to: email,
                subject: "verify your email",
                html:`<h1>verification</h1>
                <p>${link}</p>`

                
              };
             await transporter.sendMail(mailOptions,(error)=>{
                if (error) throw error 
                else {
                    res.status(200).send({msg:"check your email to activate your account"})
                }

              })
        }
    } catch (error) {
        res.status(500).send({msg:"failed to send email"})
    }
}
exports.signUp = async (req, res) => {
    try {
        console.log(req.params.token);
        
        const secretkey = "ABC123"
const verify=req.params.token
const decode=jwt.verify(verify,secretkey)
delete decode.iat

            const user = new users(decode)
            const salt = 10
            const hpassword = bcrypt.hashSync(user.password, salt)
            user.password = hpassword
            const token = jwt.sign({
                id: user._id,
                name: user.name
            }, secretkey)
            await user.save()
            res.status(200).send({
                Msg: "account created successfully",
                user,
                token,
            })
        
    } catch (error) {
        res.status(500).send({
            Msg: "failed to create the account",
            error
        })
    }
}
exports.signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const found = await users.findOne({ email })
        if (!found) {
            res.status(400).send({
                Msg: "you need to create an account"

            })
        }
        else {
            const match = bcrypt.compareSync(password, found.password)
            if (!match) {
                res.status(400).send({
                    Msg: "your password is incorrect"
                })
            }
            else {
                const secretkey = "ABC123"
                const token = jwt.sign({
                    id: found._id,
                    name: found.name
                }, secretkey)
                res.status(200).send({
                    Msg: "login successfuly",
                    user: found, token
                })
            }
        }
    } catch (error) {
        res.status(500).send({
            Msg: "login failed"
        })
    }
}
exports.updateuser=async(req,res)=>{
    const user=req.user
    try {
      const updateduser=await users.updateOne({
        _id:user._id
      },{$set:{...req.body}})  
      res.status(200).send({
        Msg:"updated successfuly",
        updateduser
      })
    } catch (error) {
        res.status(500).send({
            Msg:"failed to update",
            error
        })
    }
}
exports.forgetpassword=async(req,res)=>{
const{email}=req.body
    try {
        const found = await users.findOne({ email })
        if (!found) {
            res.status(400).send({
                Msg: "you need to create an account"

            })
        }
        else {
const code=gp.generate({
    length:4,
    numbers:true,
    lowercase:false,
    uppercase:false,
    symbols:false,
})
console.log(code);
const link=`http://localhost:5000/users/reset/${found._id}/${code}`
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"saidbouchniba8@gmail.com",
        pass:"eqdz acwe drvb jsqs"
    }

})
var mailOptions = {
    from: 'saidbouchniba8@gmail.com',
    to: email, 
    subject: "password account verification ",
    html:`<h1>your passcode for password changing is</h1>
    <p>${code}</p>
    <a href=${link}>click here to update your password</a>
    `

    
  };
 await transporter.sendMail(mailOptions,(error)=>{
    if (error) throw error 
    else {
        res.status(200).send({msg:"check your email to reset your password"})
    }

  })
        }
        
    } catch (error) {
        res.status(500).send({msg:"password can be changed"})
    }
}
exports.resetpassword=async(req,res)=>{
const id=req.params.id
const password=req.body.password
try {
    const found=await users.findOne({
        _id:id

    })
    const hashpassword=bcrypt.hashSync(password,10)
    found.password=hashpassword
    await found.save()
    res.status(200).send({msg:"password has been updated"})
} catch (error) {
    res.status(500).send({msg:"password failed to be updated"})

}
}