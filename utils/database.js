const mysql = require("mysql");

exports.database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "iroid",
    multipleStatements: true
});

// exports.default = database;