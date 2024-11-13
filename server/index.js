const dotnev = require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const path = require('path')
const fs = require('fs');

const app = express();
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(cors());
app.use(bodyParser.json());


app.get('/', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
});

const db = mysql.createConnection({
  host: process.env.STACKHERO_MYSQL_HOST,
  user: 'root',
  password: process.env.STACKHERO_MYSQL_ROOT_PASSWORD,
  database: 'freakputing'
});

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

const people = JSON.parse(fs.readFileSync(path.join(__dirname, 'results-final.json'), 'utf-8'));

app.get('/people/:personname', (req, res) => {
  const person = people.find((p) => p.name === req.params.personname);
  if (person) {
    res.send(`
      <h1>${person.name}</h1>
            <p><strong>Email:</strong> ${person['Email address']}</p>
            <p><strong>Favorite Color:</strong> ${person.favColor}</p>
            <p><strong>Hobbies:</strong> ${person.hobbies}</p>
            <p><strong>Favorite Shows:</strong> ${person.favShows}</p>
            <p><strong>Favorite Snack:</strong> ${person.favSnack}</p>
            <p><strong>Favorite Candy:</strong> ${person.favCandy}</p>
            <p><strong>Favorite Scent:</strong> ${person.favScent}</p>
            <p><strong>Practical vs Fun:</strong> ${person.PracticalVsFun}</p>
            <p><strong>Favorite Theme:</strong> ${person.favTheme}</p>
            <p><strong>Favorite Team:</strong> ${person.favTeam}</p>
            <p><strong>Collects:</strong> ${person.collects}</p>
            <p><strong>Extra:</strong> ${person.extra}</p>
      `); // Send the person's info as JSON);
  } else {
      res.status(404).send('Person not found');
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server is running on ${PORT}`);
});
  