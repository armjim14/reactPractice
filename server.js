const express = require("express");
const mysql = require("mysql");



conn.connect()

const app = express();

app.get("/sections", (req, res) => {
    console.log(conn);
    conn.query("select * from sections", (err, data) => {
        return res.send(data)
    })
})

app.listen(3001, () => {
    console.log("Listening...")
})