const dotnev = require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const path = require('path');
const { populate } = require('dotenv');

const db = mysql.createConnection({
  host: 'hfjkjl.stackhero-network.com',
  user: 'root',
  password: 'EzTpUfehnqTXWGxvF37t92fDcNWMWCFw',
  database: 'freakputing'
});

async function getNames() {
  const names = []
  return await new Promise ((resolve, reject)=>{
    db.query('SELECT * FROM freaksanta', (err, results) =>{
      if (err) {
        console.error('Error inserting data:', err) }
      else{
        for (let i = 0; i < results.length; i++){
          names.push(results[i].name)
        }
        resolve(names)
      } 
    });
  });
}

//let peopleList = people.results;
async function randomgen(list, newList){
  const query = `
   UPDATE freaksanta
   SET person = ?
   WHERE name = ?;
`;
    for (let i = 0; i < list.length; i++){
        let random = Math.floor(Math.random() * list.length);
        while(newList.includes(list[random]) || list[random] == list[i]){
          random = Math.floor(Math.random() * list.length); 
        } 
        newList.push(list[random])
        db.query(query, [list[random], list[i]] , (err, results) => {
          if (err) {
              console.error('Error updating data:', err);
          } else {
              console.log('Update successful:', results);
          }
    })
          
    }
    return newList
}

const emptylist = []

async function displayNames() {
  try {
  const bs = await getNames()
  .then((value) => {
    console.log(randomgen(value, emptylist))
})
   
} catch (err) {
    console.error('Error:', err);
}
 
}

displayNames()

//console.log(randomgen(peopleList, emptylist));