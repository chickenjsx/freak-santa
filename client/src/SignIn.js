import React, { useState, useEffect } from 'react';
import './Main.css'


export default function SignIn({updateShowPerson, updateShowSignUp, updateShowSignIn, updateName, name, updateUsername, username}){

    const [password, setPassword] = useState('')
    const [user, setUser] = useState(username)
    const [data, setData] = useState([])

    

    useEffect(() => {
        fetch(`${process.env.PORT || "http://localhost:5600/index"}`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        let userExist = false
        for(let i = 0; i < data.length; i++){
            if(data[i].username === user){
                userExist = true
                if(data[i].password === password){
                    updateShowSignIn(false)
                    updateShowSignUp(false)
                    updateShowPerson(true)
                    updateName(data[i].name)
                break
                }else{
                    alert('wrong password or username; try again or contact augstine')
                }
            }
        }
        if(!userExist){
            alert('username doesnt exist, please sign up!')
        }
        }
        

    
    const signUp = (e) =>{
        e.preventDefault();
        updateShowSignIn(false)
        updateShowSignUp(true)
    }        
    //creates a form to get name and password
    return(
        <div className='main-container'>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <label className='username'>
                        Enter username: <br/>
                        <input
                        type='text'
                        name = 'name'
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
                        Don't have an acoount? <br/>
                    <button onClick={signUp} className='signUp'>Sign Up</button>
                    </label>
                    
                </form>
            </div>
    )
}