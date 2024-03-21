import React from 'react'

function Play({data}) {

  return (
    <button id="play" onClick={() => data('play')}>Play</button>
  )
}

export default Play