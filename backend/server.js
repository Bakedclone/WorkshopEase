const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const db = new sqlite3.Database('./database/mydatabase.db'); 

app.use(bodyParser.json());
app.use(cors());

// Define routes to interact with the database
app.get('/fetch_customers', (req, res) => {
    db.all('SELECT  * FROM Customers', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows); 
        }
    });
});

app.post('/add_customer', (req, res)=> {
    const receivedData = req.body;  //bp
    console.log('Received Data:', receivedData);
    console.log('try : ',receivedData.formdata.name);

    const sql = "INSERT INTO customers ('C_ID',  'Name', 'Contact', 'Mail', 'Address') VALUES (?, ?, ?, ?, ?)";
    const values = [
        receivedData.formdata.C_ID.toUpperCase(),
        receivedData.formdata.Name,
        receivedData.formdata.Contact,
        receivedData.formdata.Mail,
        receivedData.formdata.Address
    ]
    db.run(sql, [values[0], values[1], values[2], values[3], values[4]], (err)=>{
        if(err) console.log(err);
        else console.log('Added Successfully');
    })
})

app.use(bodyParser.json());
app.use(cors());

app.put('/update_customer', (req, res)=> {
    const receivedData = req.body;  //bp
    console.log('Received Data:', receivedData);
    console.log('try : ',receivedData.formdata.Name);

    const sql = "UPDATE customers set Name = ? ,Contact = ?, Mail = ?, Address = ? where C_ID = ?";
    const values = [
        receivedData.formdata.C_ID,
        receivedData.formdata.Name,
        receivedData.formdata.Contact,
        receivedData.formdata.Mail,
        receivedData.formdata.Address
    ]
    db.run(sql, [values[1], values[2], values[3], values[4], values[0]], (err)=>{
        if(err) console.log(err);
        else console.log('Updated Successfully');
    })
})

app.delete('/customer/:id', (req, res)=>{
    const sql = "DELETE FROM customers WHERE C_ID = ?";
    const id = req.params.id;
    db.run(sql, [id], (err)=>{
        if(err) console.log(err);
        else console.log('Deleted Successfully');
    })
})

// GOLD IN

app.get('/fetch_gold_in', (req, res) => {
    db.all('SELECT  * FROM Gold_IN', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows); 
        }
    });
});

app.post('/add_gold_in', (req, res)=> {
    const receivedData = req.body;  //bp
    console.log('Received Data:', receivedData);
    console.log('try : ',receivedData.formdata.name);

    const sql = "INSERT INTO Gold_IN ('DT', 'C_ID',  'Gold_wgt') VALUES (?, ?, ?)";
    const values = [
        receivedData.formdata.DT,
        receivedData.formdata.C_ID.toUpperCase(),
        receivedData.formdata.Gold_wgt,
    ]
    console.log(values[0]);
    db.run(sql, [values[0], values[1], values[2]], (err)=>{
        if(err) console.log(err);
        else console.log('Added Successfully');
    })
})

app.delete('/gold_in/:id', (req, res)=>{
    const sql = "DELETE FROM Gold_IN WHERE ID = ?";
    const id = parseInt(req.params.id);
    db.run(sql, [id], (err)=>{
        if(err) console.log(err);
        else console.log('Deleted Successfully');
    })
})

app.put('/update_gold_in', (req, res)=> {
    const receivedData = req.body;  //bp
    console.log('Received Data:', receivedData);
    console.log('try : ',receivedData.formdata.Name);

    const sql = "UPDATE Gold_IN set DT = ? ,C_ID = ?, Gold_wgt = ? where ID = ?";
    const values = [
        receivedData.formdata.ID,
        receivedData.formdata.DT,
        receivedData.formdata.C_ID,
        receivedData.formdata.Gold_wgt
    ]
    db.run(sql, [values[1], values[2], values[3], values[0]], (err)=>{
        if(err) console.log(err);
        else console.log('Updated Successfully');
    })
})

// Orders

app.get('/fetch_orders', (req, res) => {
    db.all('SELECT  * FROM Orders', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows); 
        }
    });
});

app.post('/add_orders', (req, res)=> {
    const receivedData = req.body;  //bp
    console.log('Received Data:', receivedData);
    console.log('try : ',receivedData.formdata.C_ID);

    const sql = "INSERT INTO Orders (DT, O_ID, C_ID, Category, Size, Piece, Approx_wgt, Wastage, Extra_ghut) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        receivedData.formdata.DT,
        receivedData.formdata.O_ID,
        receivedData.formdata.C_ID,
        receivedData.formdata.Category,
        receivedData.formdata.Size,
        receivedData.formdata.Piece,
        receivedData.formdata.Approx_wgt,
        receivedData.formdata.Wastage,
        receivedData.formdata.Extra_ghut
    ]
    db.run(sql, [values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8]], (err)=>{
        if(err) console.log(err);
        else console.log('Added Successfully');
    })
})

app.delete('/orders/:id', (req, res)=>{
    const sql = "DELETE FROM orders WHERE O_ID = ?";
    db.run(sql, [req.params.id], (err)=>{
        if(err) console.log(err);
        else console.log('Deleted Successfully');
    })
})

app.put('/update_orders', (req, res)=> {
    const receivedData = req.body;  //bp
    console.log('Received Data:', receivedData);

    const sql = "UPDATE Orders set DT = ?, C_ID = ?, Category = ?, Size = ?, Piece = ?, Approx_wgt = ?, Wastage = ?, Extra_ghut = ? where O_ID = ?";
    const values = [
        receivedData.formdata.O_ID,
        receivedData.formdata.DT,
        receivedData.formdata.C_ID,
        receivedData.formdata.Category,
        receivedData.formdata.Size,
        receivedData.formdata.Piece,
        receivedData.formdata.Approx_wgt,
        receivedData.formdata.Wastage,
        receivedData.formdata.Extra_ghut
    ]
    db.run(sql, [values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[0]], (err)=>{
        if(err) console.log(err);
        else console.log('Updated Successfully');
    })
})

// Balance


app.get('/fetch_total_balance', (req, res) => {
    db.all('SELECT SUM(Gold_wgt) FROM Balance where Gold_wgt > 0', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows); 
        }
    });
});

app.get('/fetch_balance', (req, res) => {

    async function update() {
        const IDs = await dbAll('SELECT C_ID FROM Balance');

        IDs.map((value)=>{
            const curr_C_ID = value.C_ID;
            var sumIN, sumOUT, sumProfit;
            async function sum() {
                sumIN = await dbAll(`SELECT SUM(Gold_wgt) FROM Gold_IN WHERE C_ID = ?`,[curr_C_ID]);
                sumOUT = await dbAll(`SELECT SUM(Gold_wgt) FROM Gold_OUT WHERE C_ID = ?`,[curr_C_ID]);
                sumProfit = await dbAll(`SELECT SUM(Profit) FROM Gold_OUT WHERE C_ID = ?`,[curr_C_ID]);

                // console.log(sumIN[0]['SUM(Gold_wgt)']);
                sumIN = sumIN[0]['SUM(Gold_wgt)'];
                sumOUT = sumOUT[0]['SUM(Gold_wgt)'];
                sumProfit = sumProfit[0]['SUM(Profit)'];
                // console.log(sumIN - sumOUT);
                db.run('UPDATE Balance set Gold_wgt = ? where C_ID = ?', [parseFloat(sumIN - sumOUT - sumProfit), curr_C_ID],(err)=>{
                    if(err) console.log(err);
                    // else console.log('Updated Balance');
                });
            }
            sum();
        })
    }
    update();


    db.all('SELECT * FROM Balance', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows); 
        }
    });
});



app.put('/update_balance', (req, res)=> {
    const receivedData = req.body;  //bp
    console.log('Received Data:', receivedData);

    const sql = "UPDATE Balance set Name = ? where C_ID = ?";
    const values = [
        receivedData.formdata.Name,
        receivedData.formdata.C_ID
    ]
    db.run(sql, [values[0], values[1]], (err)=>{
        if(err) console.log(err);
        else console.log('Balance : Updated Successfully');
    })
})

app.delete('/balance/:id', (req, res)=>{
    const sql = "DELETE FROM Balance WHERE C_ID = ?";
    const id = req.params.id;
    console.log(id);
    db.run(sql, [id], (err)=>{
        if(err) console.log(err);
        else console.log('Balance : Deleted Successfully');
    })
})

app.post('/add_balance', (req, res)=> {
    const receivedData = req.body;  //bp
    console.log('Received Data:', receivedData);

    const sql = "INSERT INTO Balance ('Name', 'C_ID',  'Gold_wgt') VALUES (?, ?, ?)";
    const values = [
        receivedData.formdata.Name,
        receivedData.formdata.C_ID.toUpperCase(),
        receivedData.formdata.Gold_wgt,
    ]
    console.log(values[0]);
    db.run(sql, [values[0], values[1], values[2]], (err)=>{
        if(err) console.log(err);
        else console.log('Added Successfully');
    })
})

// Gold Out

app.get('/fetch_gold_out', (req, res) => {
    db.all('SELECT  * FROM Gold_OUT', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows); 
        }
    });
});

const { promisify } = require('util');
const dbAll = promisify(db.all.bind(db));

app.post('/add_gold_out', (req, res)=> {
    const receivedData = req.body;  //bp
    console.log('Received Data:', receivedData);

    const sql = "INSERT INTO Gold_Out ('DT', 'O_ID', 'C_ID', 'Gold_wgt', 'Profit') VALUES (?, ?, ?, ?, ?)";
    async function insert() {
        const fetch = await dbAll(`SELECT C_ID, Wastage FROM Orders where O_ID = ${receivedData.formdata.O_ID}`);
        // const fetch_wastage = await dbAll(`SELECT Wastage FROM Orders where O_ID = ${receivedData.formdata.O_ID}`);

        console.log('All Users:', fetch);
        const values = [
            receivedData.formdata.DT,
            parseInt(receivedData.formdata.O_ID),
            fetch[0].C_ID,
            parseFloat(receivedData.formdata.Gold_wgt),
            parseFloat((fetch[0].Wastage/100) * receivedData.formdata.Gold_wgt),
        ]
        
        db.run(sql, [values[0], values[1], values[2], values[3], values[4]], (err)=>{
            if(err) console.log(err);
            else console.log('Added Successfully');
        })
    }

    insert();
    
})

app.delete('/gold_out/:id', (req, res)=>{
    const sql = "DELETE FROM Gold_Out WHERE O_ID = ?";
    const id = parseInt(req.params.id);
    db.run(sql, [id], (err)=>{
        if(err) console.log(err);
        else console.log('Gold Out : Deleted Successfully');
    })
})

app.put('/update_gold_out', (req, res)=> {
    const receivedData = req.body;  //bp
    console.log('Received Data:', receivedData);

    const sql = "UPDATE Gold_OUT set DT = ?, O_ID = ?, C_ID = ?, Gold_wgt = ?, Profit = ? where O_ID = ?";
    async function update() {
        const fetch = await dbAll(`SELECT C_ID, Wastage FROM Orders where O_ID = ${receivedData.formdata.O_ID}`);
        // const fetch_wastage = await dbAll(`SELECT Wastage FROM Orders where O_ID = ${receivedData.formdata.O_ID}`);

        console.log('All Users:', fetch);
        const values = [
            receivedData.formdata.DT,
            parseInt(receivedData.formdata.O_ID),
            fetch[0].C_ID,
            parseFloat(receivedData.formdata.Gold_wgt),
            parseFloat((fetch[0].Wastage/100) * receivedData.formdata.Gold_wgt),
        ]
        
        db.run(sql, [values[0], values[1], values[2], values[3], values[4], values[1]], (err)=>{
            if(err) console.log(err);
            else console.log('Gold Out : Updated Successfully');
        })
    }

    update();
})

// Total Profit

app.get('/fetch_total_profit', (req, res) => {

    db.all("SELECT SUM(Profit) FROM Gold_OUT WHERE strftime('%Y-%m', DT) = strftime('%Y-%m', 'now');", (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows); 
        }
    });
});

// Task Progress

app.get('/fetch_task_progress', (req, res) => {

    var percentage;

    async function task() {
            var countOrders, countDelivered, sumProfit;
            async function sum() {
                countOrders = await dbAll(`SELECT COUNT(*) FROM Orders`);
                countDelivered = await dbAll(`SELECT COUNT(*) FROM Gold_OUT`);  
                console.log(countOrders);
                countDelivered = countDelivered[0]['COUNT(*)'];
                countOrders = countOrders[0]['COUNT(*)'];

                percentage = parseInt((countDelivered * 100)/countOrders);
                console.log(percentage);
                res.json(percentage);
            }
            sum();
        }
    task();
});


// Monthly Profit

app.get('/fetch_monthly_profit', (req, res) => {

    var monthly_profit;

    async function task() {
            var countOrders, countDelivered, sumProfit;
            async function sum() {
                monthly_profit = await dbAll(`SELECT strftime('%m', DT) AS Month, SUM(Profit) AS TotalProfit FROM Gold_OUT GROUP BY Month ORDER BY Month`);
                // console.log(countOrders);

                // monthly_profit = parseInt((countDelivered * 100)/countOrders);
                console.log(monthly_profit);
                res.json(monthly_profit);
            }
            sum();
        }
    task();
});







// Other routes for inserting, updating, deleting data, etc.

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('Server is running');
});
