import './Parent.css'
import './Main.css'
import {useState, useEffect} from 'react'

export default function Display({updateShowPerson, updateShowSignUp, updateShowSignIn, updateName, name, updateUsername, username}){    

    const [data, setData] = useState([])
    const [personInfo, setPersonInfo] = useState("")

      var person = ''
    for(let i =0; i<data.length; i++){
        if(data[i].name == name){
            person = data[i].person
            break;
        }
    }
 
    useEffect(() => {
    fetch("https://freak-santa-ccf1d9ca9dc9.herokuapp.com/index")
        .then((response) => response.json())
        .then((data) => setData(data))
        .then(setPersonInfo(`https://freak-santa-ccf1d9ca9dc9.herokuapp.com/people/${person}`))
        .catch((error) => console.error('Error fetching data:', error));
}, []);

 
    
    return(
        <div className='main-container'>
           <p>Hey {name}</p>
           <br></br>
            <p> Please buy a gift for {person}</p>
            <a href={personInfo}>Here's a little something about them</a>
    </div>)
}