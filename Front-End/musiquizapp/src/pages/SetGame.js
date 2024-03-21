import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../components/Button'
function Teams({set}){

    return(
        <div className='input'>
            <b><label htmlFor="numberteams">Nombre d'équipes :</label></b>
            <input type="number" name="numberteams" onChange={e => set(e.target.value)}/>
        </div>
    )
}
function Turns({set}){

    return(
        <div className='input'>
            <b><label htmlFor="numberturns">Nombre de tours :</label></b>
            <input type="number" name="numberturns" onChange={e => set(e.target.value)}/>
        </div>
    )
}

function SetGame() {
    const location = useLocation()
    const { choice } = location.state

    const [time, setTime] = useState(0)
    const [numberteams, setNumberteams] = useState(0)
    const [numberturns, setNumberturns] = useState(0)

    const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
    <div id="form">
        <div id="inputs">
            <div className='input'>
                <b><label htmlFor="time">Durée des tours (en minutes) :</label></b>
                <input type="number" name="time" onChange={e => setTime(e.target.value)}/>
            </div>
        {choice === 'Jeu en équipe'? (<Teams set={setNumberteams}/> ) : (
            (<Turns set={setNumberturns}/>)
        )}
        </div>
        {choice === 'Jeu en équipe'? (<Button link={'/game'} text={'Valider'} set={[choice,numberteams, time]}/>) : (
            <Button link={'/game'} text={'Valider'} set={[choice,numberturns, time]}/>
        )
        }
    </div>
    </>
  )
}

export default SetGame