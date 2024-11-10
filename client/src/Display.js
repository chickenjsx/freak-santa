import './Parent.css'
import './Main.css'

export default function Display({updateShowPerson, updateShowSignUp, updateShowSignIn, updateName, name, updateUsername, username}){
    return(
        <div className='main-container'>
           <p>Hey {name}</p>
           <br></br>
           Hat is sorting.... Try again Later
    </div>)
}