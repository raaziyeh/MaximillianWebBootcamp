const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    host: "localhost",
    database: "blog",
    user: "root",
    password: "9P!o8S&t8@202"
})

module.exports = pool