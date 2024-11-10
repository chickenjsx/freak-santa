import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Display from './Display';
 
function Main(){
    const [showSignUp, setShowSignUp] = useState(false)
    const [showPerson, setShowPerson] = useState(false)
    const [showSignIn, setShowSignIn] = useState(true)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')

    const updateShowSignUp = (newValue) => {
        setShowSignUp(newValue)
    }

    const updateShowSignIn = (newValue) => {
        setShowSignIn(newValue)
    }

    const updateShowPerson = (newValue) => {
        setShowPerson(newValue)
    }

    const updateName  = (newValue) =>{
        setName(newValue)
    }

    const updateUsername = (newValue) => {
        setUsername(newValue)
    }
    
    
    const props = {
        updateShowPerson,
        updateShowSignIn,
        updateShowSignUp,
        updateName,
        name,
        updateUsername,
        username
    }


    if(showSignUp){
    return(
        <div className='main'>
            <SignUp {...props}/>
        </div>
        )
    }
    else if(showSignIn){
        return(
            <div className='main'>
            <SignIn {...props}/>
        </div>
        )
    }
    else if (showPerson){
        return(
            <div className='main'>
            <Display {...props}/>
        </div>
        )
    }
    
}


export default Main