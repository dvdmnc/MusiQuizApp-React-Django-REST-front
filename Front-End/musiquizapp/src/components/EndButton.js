import React from 'react'
import { Link } from 'react-router-dom'

function EndButton(scores, type) {
  return (
    <Link id='next' to={'/endgame'} state={{scores, type}}>
        <button id="next">Suivant</button>
    </Link>
  )
}

export default EndButton