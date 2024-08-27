const { body, validationResult } = require("express-validator")
exports.signUpvalidation = [body("email", "this format is not correct").isEmail(),
body("password", "this password is not secure").isStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minSymbols: 0,
    minNumbers: 1,
})
]
exports.signinvalidation = [body("email", "this format is not correct").isEmail(),]
exports.validation = (req, res, next) => {
    const errors = validationResult(req)
    try {
        if (!errors.isEmpty()) {
            res.status(400).send({
                Msg: "there is something wrong",
                errors: errors.array()
            })
        }
        else {
            next()
        }
    } catch (error) {
        res.status(500).send({
            Msg: "there is something wrong",
            error
        })
    }
}




