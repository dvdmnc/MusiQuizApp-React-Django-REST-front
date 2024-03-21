import React, { useState } from 'react'
import {useLocation} from 'react-router-dom'
import Button from '../components/Button'

function EndGame() {
    const location = useLocation()
    const { scores } = location.state

    const max = Math.max(...scores.scores)
    const maxIndices = scores.scores.reduce((indices, element, index) => {
        if (element === max) {
            indices.push(index);
        }
        return indices;
    }, [])

  return (
    <div id="button-container">
    {scores.type !== "Jeu en équipe" ? (<h1>Fin de la partie, Bravo à tous !</h1>) : 
    maxIndices.length === 1 ? (<h1>L'Equipe {maxIndices[0]+1} gagne la partie ! Bravo !</h1>) : 
    (<h1>Les Equipes {maxIndices.map(index => index + 1).join(', ')} gagnent la partie, Bravo !</h1>)}
    <Button link={'/gamechoice'} text={'Nouvelle Partie'}/>
    </div>
  )
}

export default EndGame