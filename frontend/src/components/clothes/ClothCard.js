import React from 'react'

import {Link} from 'react-router-dom'

const ClothCard = ({_id, title, image, rentalPrice}) => {
  return (
    <Link to={`/clothes/${_id}`}>
      <div className="Clothes-card">
        <div className="card-header">
        </div>
        <div className="img">
          <img src={image[0]} alt={title} loading="lazy" width="255" height="255" />
        </div>
        <div className="Card-text">
          <h4 className="Title"><strong>{title}</strong></h4>
          <h5 className="Subtitle"><strong>Rental Price:</strong> {`£${rentalPrice}`}</h5>
        </div>
      </div>
    </Link>
  )
}

export default ClothCard