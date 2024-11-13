import './Parent.css'
import './Main.css'
import {useState, useEffect} from 'react'

export default function Display({updateShowPerson, updateShowSignUp, updateShowSignIn, updateName, name, updateUsername, username}){    

    const [data, setData] = useState([])
    
    useEffect(() => {
    fetch("https://freak-santa-ccf1d9ca9dc9.herokuapp.com/")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error('Error fetching data:', error));
}, []);

    var person = ''
    for(let i =0; i<data.length; i++){
        if(data[i].name == name){
            person = data[i].person
            break;
        }
    }
    return(
        <div className='main-container'>
           <p>Hey {name}</p>
           <br></br>
            <p> Please buy a gift for {person}</p>
    </div>)
}