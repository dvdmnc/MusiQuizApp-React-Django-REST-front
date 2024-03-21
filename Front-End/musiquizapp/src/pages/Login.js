import React from 'react'
import { useState, useContext } from 'react'
import { TokenContext } from '../context'
import {Navigate} from 'react-router-dom'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {VerifyToken} = useContext(TokenContext)
    let isAuthenticated = !VerifyToken() ? false : true

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"username": username, "password": password}),
    };
    
    function handleSubmit() {
        fetch("https://api-musiquizapp.up.railway.app/api/token/", requestOptions)
        .then((response) => {
            if (response.status === 200) {
            return response.json()
            .then(data => {
                localStorage.setItem("accessToken", data.access)
                localStorage.setItem("refreshToken", data.refresh)
                setUsername('')
                setPassword('')
                window.location.replace('https://musiquizapp.up.railway.app/newgame');
            })
          }
          setUsername('')
          setPassword('')
          alert("Adresse mail ou mot de passe incorrect")
          return false
        })
    };

  return (
    <>{isAuthenticated ? <Navigate to='/newgame' replace={true}/> :
      (<>
    <div id="logintitle">Merci de vous connecter pour commencer à jouer</div>
    <br></br>
    <div id="login">
        <div>
            <label htmlFor='email'>Adresse mail</label>
            <input placeholder='Ecrivez ici' type='email' name='email' value={username} required onChange={e => setUsername(e.target.value)}/>
        </div>
        <div>
        <label htmlFor='password'>Mot de passe</label>
        <input placeholder='Ecrivez ici' type='password' name='password' value={password} required onChange={e => setPassword(e.target.value)}/> 
        </div>
        <button type='button' onClick={handleSubmit} id='submit' >Valider</button>
    </div>
    </>)
}
    </>
  )
}

export default Login
