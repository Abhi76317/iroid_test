require("dotenv").config({path: "./.env"});
const express = require("express");
const {database} = require("./utils/database")
const authRoute = require("./router/auth")
const categoryRoute = require("./router/category")
const itemRouter = require("./router/item")
const cookieParser = require("cookie-parser")
const is_auth = require("./controler/is_auth")
const app = new express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser(process.env.cookieToken))

app.use("/authroute", authRoute)
app.use("/categoryroute", is_auth, categoryRoute)
app.use("/itemroute", is_auth, itemRouter)


app.use((error, req, res, next) => {
    // console.log("error",error)
    if(error.code === "EBADCSRFTOKEN"){
        error.statusCode = 403;
        error.message = "Access Denied "
    }

    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data})
})

app.listen(process.env.PORT || 5000, ()=> {
    database.connect((err)=> {
        if(err) throw err;
        console.log("server started")
    })
})