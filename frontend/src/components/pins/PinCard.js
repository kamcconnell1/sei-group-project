import React from 'react'

const PinCard = ({ title, place, note, createdAt, _id, deletePin }) => {



  return (
    <div className="pincard">
    <h1 className="is-size-5"><strong>{title.toUpperCase()}</strong></h1>
    <h2 className="is-size-6">{place.charAt(0).toUpperCase()+place.slice(1)}</h2>
    <p >Notes: {note}</p>
    <p><small>Pin Saved on: {createdAt.slice(0,10)}</small></p>
    <button onClick={deletePin} value={_id}>Remove Pin</button>
    </div>
  )
}

export default PinCard