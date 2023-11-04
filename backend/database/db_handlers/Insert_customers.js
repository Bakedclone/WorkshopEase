const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

const db = new sqlite3.Database('../database.db');

console.log("db conneted");

app.use(express.json());

app.post('/addCustomer', (req, res) => {
  const { name, c_id, contact, mail, address } = req.body;
  db.run('INSERT INTO Customers (C_ID, Name, Contact, Mail, Address) VALUES (?, ?)', [c_id, name, contact, mail, address], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error inserting data');
    } else {
      res.send('Data inserted successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
