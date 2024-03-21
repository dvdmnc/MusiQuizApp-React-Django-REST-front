import React from 'react'

function Faces({index, source, link}) {
  return (
    <a className="facelink" key={index} onClick={() => {link(source)}}><img className="face" src={`${source}`}/></a>
  )
}

export default Faces