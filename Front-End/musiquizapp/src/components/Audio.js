import React from 'react'

function Audio({source, link}) {
  return (
    <div className='listendisplay'>
        <a onClick={() => {link(source)}}>Choisir</a>
        <audio src={`${source}`} controls>
            Your browser does not support the audio tag.
        </audio>
    </div>
  )
}

export default Audio