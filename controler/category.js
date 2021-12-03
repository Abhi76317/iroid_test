// require("dotenv").config({ path: "./.env" });
// const jwt = require("jsonwebtoken")
const { database } = require("../utils/database")

exports.addCategory = (req, res, next) => {
    const title = req.body.title;

    const query = `insert into category (title) values ('${title}')`

    database.query(query, (err, result) => {
        if (err) throw err;

        else {
            res.status(201).json({ message: "category added successfully" })
        }
    })

}

exports.editCategory = (req, res, next) => {
    const title = req.body.title;
    const id = req.params.id;

    const query = `update category set title = '${title}' where id = '${id}'`

    database.query(query, (err, result) => {
        // console.log("result", result.affectedRows)
        if (err) { throw err; }
        console.log("res", result)
        if (result.affectedRows == 0) {
            const err = new Error("Selected Category not found")
            next(err);
        }
        else {
            res.status(201).json({ message: "category updated successfully" })
        }

    })

}

exports.deleteCategory = (req, res, next) => {
    const id = req.params.id;

    const query = `delete from category where id = ('${id}')`

    database.query(query, (err, result) => {
        if (err) {
            console.log("err", err.errno)
            const errno = err.errno || null;
            if (errno == 1451) {
                const err = new Error("Selected Category not found")
                err.statusCode = 500;
                next(err);
            } else {
                throw err;
            }
        }
        else {
            console.log("res", result)
            if (result.affectedRows == 0) {
                const err = new Error("Selected Category not found")
                next(err);
            }
            else {
                res.status(201).json({ message: "category deleted successfully" })
            }
        }

    })

}