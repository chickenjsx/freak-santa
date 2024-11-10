const dotnev = require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const path = require('path')

const app = express();
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(cors());
app.use(bodyParser.json());


app.get('/*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server is running on ${PORT}`);
});
  