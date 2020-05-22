import React from 'react'

import { Link } from 'react-router-dom'

const UserClothCard = ({ _id, title, image, rentalPrice }) => {
  return (
    <Link to={`/clothes/${_id}`}>
      <div className="My-items-card">
        <div className="img">
          <img src={image[0]} alt={title} loading="lazy" width="255" height="255" />
        </div>
        <div className="Card-text">
          <p className="Title">{title}</p>
          <p className="Subtitle">{`Rent £${rentalPrice} (7 Days)`}</p>
        </div>
      </div>
    </Link>
  )
}

export default UserClothCard