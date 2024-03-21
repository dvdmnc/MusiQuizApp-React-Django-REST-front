import React from 'react'

function Pause({data}) {
  return (
    <button id="pause" onClick={() => data('pause')}>Pause</button>
  )
}

export default Pause