const express = require("express");
const mysql = require("mysql");


conn.connect()

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

let Port = process.env.port || 3001

// Getting info
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

// Updating indo
app.put("/update/cat", (req, res) => {
    conn.query(`update sections set sectionName = '${req.body.newName}' where CatID = ${req.body.id}`, (err, data) => {
        console.log(data);
        return res.send({updated: true})
    })
})
app.put("/update/bill", (req, res) => {
    let { id, newName, date, amount } = req.body
    let strQy = `
                    update bills 
                    set billName = '${newName}', 
                        dueDate = '${date}', 
                        amount = ${amount}
                    where BillID = ${id}
                `

    conn.query(strQy, (err, data) => {
        return res.send({updated: true})
    })
})

// Adding Info
app.post('/add/cat', (req, res) => {
    conn.query(`insert into sections ( sectionName ) value ('${req.body.name}')`, (err, data) => {
        return res.send({added: true})
    })
})
app.post('/add/bill', (req, res) => {
    let { billName, date, amount } = req.body;
    conn.query(`insert into bills ( billName, dueDate, amount ) value ('${billName}', '${date}', ${amount})`, (err, data) => {
        return res.send({added: true})
    })
})
app.post('/add/trans', (req, res) => {
    let { details, date, amount, value } = req.body;
    conn.query(`insert into trans ( notes, amount, SectionID, theDate ) value ('${details}', ${amount}, ${+value}, '${date}')`, (err, data) => {
        return res.send({added: true})
    })
})


// Listening
app.listen(Port, () => {
    console.log(`Listening on ${Port}`)
})