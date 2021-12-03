require("dotenv").config({ path: "./.env" });
const jwt = require("jsonwebtoken")
const { database } = require("../utils/database")

exports.Login = (req, res, next) => {
    const id = req.body.email;
    const password = req.body.password;
    console.log("data", id)

    const query = `select * from user where email = '${id}' and password = '${password}'`

    database.query(query, (err, result) => {
        if (err) throw err;

        if (result.length <= 0) {
            console.log("yes")
            const err = new Error("email and passsword does not match")
            // res.status(422).json({message:"email and passsword does not match"})
            next(err);
        }
        else {
            const token = jwt.sign(
                {
                    id: result[0].email
                }
                , process.env.jwtToken)

            // console.log("result", result[0].email)
            res.cookie("token",token, {httpOnly: true, signed: true})
            res.status(201).json({ message: "login successfully", token: token })
        }
    })

}


exports.Logout = (req, res, next) => {

   res.clearCookie("token")

    res.status(201).json({ message: "Logout" })
}