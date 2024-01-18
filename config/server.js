const mysql = require('mysql');
require('dotenv').config();
const connDb = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connDb.connect((err) => {
  if (err) {
    console.error('Koneksi Ke Database Gagal' + err.stack);
    return;
  }
  console.log('Terhubung ke Database dengan ID' + connDb.threadId);
});

module.exports = connDb;
