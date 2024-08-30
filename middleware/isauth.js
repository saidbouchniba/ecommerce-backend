const jwt = require("jsonwebtoken")
const users = require("../model/userSchema")
exports.isauth = async (req, res, next) => {
    const token = req.header("token")
    try {
        const decode = jwt.verify(token, "ABC123")
        if (!decode) {
            res.status(400).send({
                Msg: "you are not authorized"
            })

        }
        else {
            const user = await users.findOne({
                _id: decode.id

            })
            req.user = user
            next()
        }

    } catch (error) {
        res.status(500).send({
            Msg: "failed", error
        })
    }
}
