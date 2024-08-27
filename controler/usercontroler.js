const users = require("../model/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
exports.signUp = async (req, res) => {
    const { email, password, name } = req.body
    try {
        const found = await users.findOne({ email })
        if (found) {
            res.status(400).send({
                Msg: "this user already created"

            })

        }
        else {
            const user = new users(req.body)
            const salt = 10
            const hpassword = bcrypt.hashSync(user.password, salt)
            user.password = hpassword
            const secretkey = "ABC123"
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
        }
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