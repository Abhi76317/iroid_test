// require("dotenv").config({ path: "./.env" });
// const jwt = require("jsonwebtoken")
const { database } = require("../utils/database")
// const {imageToBase64} = require("../utils/base64")
const path = require("path");

let reqPath = path.join(__dirname, '../')
let newreqPath = path.join(__dirname,'../Photo/')

exports.addItem = (req, res, next) => {
    const title = req.body.title;
    const cat_id = req.body.cat_id;
    const price = req.body.price;
    const stock = req.body.stock;
    const image = req.files.image;
    console.log("file", image)

    if (image) {
        image.mv(path.join(reqPath, "Photo", req.files.image.name), function (err) {
            if (err) {
                err.statusCode = 500;
                next(err);
            }
        })

    }
    const itemImage = newreqPath + req.files.image.name;
    console.log("imageItem",itemImage)
    const query = `insert into item (cat_id, title,image, price, stock) values ('${cat_id}', '${title}','${itemImage}', '${price}', '${stock}')`

    database.query(query, (err, result) => {
        if (err) {
            console.log("err", err.errno)
            const errno = err.errno || null;
            if (errno == 1452) {
                const err = new Error("Selected Category not found")
                err.statusCode = 500;
                next(err);
            }
            else {

                throw err;
            }
        }
        else {
            res.status(201).json({ message: "Item added successfully" })
        }
    })

}

exports.editItem = (req, res, next) => {
    const id = req.params.id;
    const title = req.body.title;
    const cat_id = req.body.cat_id;
    const price = req.body.price;
    const stock = req.body.stock;
    const image = req.files.image;

    if (image) {
        image.mv(path.join(reqPath, "Photo", req.files.image.name), function (err) {
            if (err) {
                err.statusCode = 500;
                next(err);
            }
        })

    }
    const itemImage = newreqPath + req.files.image.name;

    const query = `update item set cat_id = '${cat_id}', title = '${title}', image = '${itemImage}', price = '${price}', stock = '${stock}'  where id = '${id}'`

    database.query(query, (err, result) => {
        if (err) {
            console.log("err", err.errno)
            const errno = err.errno || null;
            if (errno == 1452) {
                const err = new Error("Selected Category not found")
                err.statusCode = 500;
                next(err);
            }
            else {

                throw err;
            }
        }
        else {
            console.log("res", result)
            if (result.affectedRows == 0) {
                const err = new Error("Selected Item not found")
                err.statusCode = 500;
                next(err);
            } else {

                res.status(201).json({ message: "Item updated successfully" })
            }
        }
    })

}

exports.deleteItem = (req, res, next) => {
    const id = req.params.id;

    const query = `delete from item where id = ('${id}')`

    database.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            console.log("res", result)
            if (result.affectedRows == 0) {
                const err = new Error("Selected Item not found")
                err.statusCode = 500;
                next(err);
            } else {

                res.status(201).json({ message: "Item deleted successfully" })
            }
        }
    })

}

exports.searchItem = (req, res, next) => {
    const data = req.params.data;
    const query = `select * from item INNER JOIN category ON category.id = item.cat_id where item.title like '%${data}%' `

    database.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            console.log("res", result)
            res.status(201).json(result)
        }
    })
}