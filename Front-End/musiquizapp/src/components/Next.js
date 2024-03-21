import React from 'react'

function Next({next}) {

  return (
    <button id="next" onClick={() => next()}>Suivant</button>
  )
}

export default Next