require("dotenv").config({ path: "./.env" });
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    let token = req.signedCookies.token;
    console.log("token", token)

    if (!token) {
        const err = new Error("Not Authorized")
        next(err);
    }
    else {
        let decodeToken;
        try {
            decodeToken = jwt.verify(token, process.env.jwtToken);
        } catch (err) {
            err.message = "Login again"
            next(err);
        }
        if(!decodeToken){
            err.message = "Login again"
            next(err);
        }
        else{
            console.log("verified user:",decodeToken.id)
            next()
        }
    }
}