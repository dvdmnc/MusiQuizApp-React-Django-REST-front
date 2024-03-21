import React from 'react'

function TeamOrTurn({gametype, number, count}) {
  return (
    <h5>{gametype === 'Jeu Collectif' ? (`Tour n°${count} sur ${number}`) : (`Equipe n°${count} sur ${number}`)}</h5>

  )
}

export default TeamOrTurn