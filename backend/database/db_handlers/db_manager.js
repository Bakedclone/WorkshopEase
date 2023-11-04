var conn = require('./connection');
var db = conn.db;

exports.addCustomer = (name) => {
    const sql = `INSERT INTO Customers (Name) Values(${name})`;
    console.log(name);
    db.exec(sql);
}