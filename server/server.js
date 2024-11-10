const dotnev = require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();


app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });



app.get('/', (req, res) => {
  db.query('SELECT * FROM freaksanta', (err, results) => {
      if (err) {
          res.status(500).json({ error: err });
      } else {
          res.json(results);
      }
  });
});

app.post('/', (req, res) => {
  const { name, password, username } = req.body; // Adjust these fields based on your data structure
  
  const query = 'INSERT INTO freaksanta (name, password, username) VALUES (?, ?, ?)';
  db.query(query, [name, password, username], (err, result) => {
      if (err) {
          console.error('Error inserting data:', err);
          res.status(500).json({ error: 'Failed to insert data' });
      } else {
          res.status(201).json({ message: 'Data added successfully', id: result.insertId });
      }
  });
});


const PORT = process.env.PORT ||5432;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  