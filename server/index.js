const dotnev = require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const path = require('path')

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.STACKHERO_MYSQL_HOST,
    user: 'root',
    password: STACKHERO_MYSQL_ROOT_PASSWORD,
    database: 'freakputing'
  });

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/index', (req, res) => {
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

app.get('/*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.get('/', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`Server is running`);
});
  