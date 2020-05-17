const express = require("express");
const mysql = require("mysql");



conn.connect()

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

let Port = process.env.port || 3001

//Getting info
app.get("/sections", (req, res) => {
    conn.query("select * from sections", (err, data) => {
        return res.send(data)
    })
})

app.get("/bills", (req, res) => {
    conn.query("select * from bills", (err, data) => {
        return res.send(data)
    })
})

app.get("/trans", (req, res) => {
    conn.query("select * from trans", (err, data) => {
        return res.send(data)
    })
})

//Updating indo
app.put("/update/cat", (req, res) => {
    conn.query(`update sections set sectionName = '${req.body.newName}' where CatID = ${req.body.id}`, (err, data) => {
        console.log(data);
        return res.send({updated: true})
    })
})

//Listening
app.listen(Port, () => {
    console.log(`Listening on ${Port}`)
})