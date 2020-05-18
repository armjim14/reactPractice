const express = require("express");
const mysql = require("mysql");

let conn = mysql.createConnection({

});

conn.connect()

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

let Port = process.env.port || 3001

// Getting info
app.get("/sections", (req, res) => {
    conn.query("select * from sections where active = 1", (err, data) => {
        return res.send(data)
    })
})
app.get("/bills", (req, res) => {
    conn.query("select * from bills where active = 1", (err, data) => {
        return res.send(data)
    })
})
app.get("/trans", (req, res) => {
    conn.query("select * from trans", (err, data) => {
        return res.send(data)
    })
})
app.get("/other/bills", (req, res) => {
    conn.query("select * from bills where active = 0", (err, data) => {
        return res.send(data)
    })
})
app.get("/other/sections", (req, res) => {
    conn.query("select * from sections where active = 0", (err, data) => {
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
app.put("/update/trans", (req, res) => {
    let { id, notes, date, amount, section } = req.body
    let strQy = `
                    update trans 
                    set notes = '${notes}', 
                        theDate = '${date}', 
                        amount = ${amount},
                        SectionID = ${section}
                    where TransID = ${id}
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

// unactivating
app.put("/del/bill", (req, res) => {
    conn.query(`update bills set active = 0 where BillID = ${req.body.id}`, (err, data) => {
        return res.send({updated: true});
    })
})
app.put("/del/cat", (req, res) => {
    conn.query(`update sections set active = 0 where CatID = ${req.body.id}`, (err, data) => {
        return res.send({updated: true});
    })
})

// Reactivating
app.put("/restore/bill", (req, res) => {
    conn.query(`update bills set active = 1 where BillID = ${req.body.id}`, (err, data) => {
        return res.send({updated: true});
    })
})
app.put("/restore/cat", (req, res) => {
    conn.query(`update sections set active = 1 where CatID = ${req.body.id}`, (err, data) => {
        return res.send({updated: true});
    })
})

// Deleting trans
app.delete("/del/trans/:id", (req, res) => {
    conn.query(`delete from trans where TransID = ${req.params.id}`, (err, data) => {
        return res.send({deleted: true})
    })
})

app.post('/filter', (req, res) => {
    let count = 0;
    let {fd, fsd, fa, fsa, fs, fromDate, toDate, singDate, fromAmount, toAmount, singAmount, catid} = req.body
    let str = 'select * from trans where '

    if (fd){
        if (count !== 0){
            str += 'and ';
        }
        str += `theDate >= '${fromDate}' and theDate <= '${toDate}' `
        count++;
    }
    if (fsd){
        if (count !== 0){
            str += 'and ';
        }
        let sign = singDate == 1 ? '>' : '<';
        let which = singDate == 1 ? fromDate : toDate;
        str += `theDate ${sign}= ${which} `
        count++;
    }
    if (fa){
        if (count !== 0){
            str += 'and ';
        }
        str += `amount >= ${fromAmount} and amount <= ${toAmount} `
        count++;
    }
    if (fsa){
        if (count !== 0){
            str += 'and ';
        }
        let sign = singAmount == 1 ? '>' : '<';
        let which = singAmount == 1 ? fromAmount : toAmount;
        str += `amount ${sign}= ${which}`
        count++;
    }
    if(fs){
        if (count !== 0){
            str += 'and ';
        }
        str += `SectionID = ${catid}`
        count++;
    }

    conn.query(str, (err, data) => {
        res.send(data)
    })
})


// Listening
app.listen(Port, () => {
    console.log(`Listening on ${Port}`)
})