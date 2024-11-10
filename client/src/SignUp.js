import './Parent.css'
import './Main.css'
import React, { useState, useEffect } from 'react';
import './Main.css'
import Main from './Main';


export default function SignUp({updateShowPerson, updateShowSignUp, updateShowSignIn, updateName, name, updateUsername, username}){

    const [password, setPassword] = useState('')
    const [user, setUser] = useState(username)
    const [nom, setNom] = useState(name)
    const [data, setData] = useState([])


    useEffect(() => {
        fetch("https://freak-santa-ccf1d9ca9dc9.herokuapp.com/index")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    
    const handleSubmit = async (e) => {
        let doesUserExists = false
        e.preventDefault();
        updateUsername(user)
        updateName(nom)
        for(let i = 0; i<data.length; i++){
            if (user === data[i].username){
                doesUserExists = true
                break
            }
        }
        if (doesUserExists){
            alert('username taken')
        }
        if(user != '' & password != '' & name != '' & !doesUserExists){
            try {
                const response = await fetch("https://freak-santa-ccf1d9ca9dc9.herokuapp.com/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({name, password, username}),
                });
                const result = await response.json();
                if (response.ok) {
                    console.log('successfully sent!');
                    setPassword('');
                    setNom('');
                    setUser('')
                } else {
                    console.error('Error:', result.error);
                }
            } catch (error) {
                console.error('Network error:', error);
            }
            
                updateUsername(user)
                updateShowSignIn(false)
                updateShowSignUp(false)
                updateShowPerson(true)
        }
    };
    
    const signIn = (e) =>{
        e.preventDefault();
        updateShowSignIn(true)
        updateShowSignUp(false)
    }        
    //creates a form to get name and password
    return(
        <div className='main-container'>
                <form onSubmit={handleSubmit} autoComplete="off">

                    <label>
                    <label className='username'>
                        Enter your Name: <br/>
                        <input
                        type='text'
                        name = 'name'
                        value={nom}
                        onChange={(e) => {setNom(e.target.value)}}/>
                    </label>

                    </label>
                    <br/>
                    <label className='name'>
                        Enter username: <br/>
                        <input
                        type='text'
                        name = 'username'
                        value={user}
                        onChange={(e) => {setUser(e.target.value)}}/>
                    </label>
                    <br/>

                    <label className='password'>
                        Enter password: <br/>
                        <input
                        type='password'
                        name = 'password'
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}/>
                    </label>

                    <br/>

                    <button onClick={handleSubmit} className='submit'>Countinue </button>
                    <br/>
                    <label className = 'newUser'>
                        Already Have an Account? <br/>
                    <button onClick={signIn} className='signIn'>Sign In</button>
                    </label>
                    
                </form>
            </div>
    )
}