import React from 'react'

import {Link} from 'react-router-dom'

const UserClothCard = ({_id, title, image, rentalPrice}) => {
  return (
    <div className="column is-half">
    <Link to={`/clothes/${_id}`}>
      <div className="card">
        <div className="card-image">
          <figure className="image image is-1by1">
            <img src={image[0]} alt={title} loading="lazy" width="255" height="255" />
          </figure>
        </div>
        <div className="card-content">
          <p className="title is-5">{title}</p>
          <p className="subtitle is-6">{`Rent £${rentalPrice} (7 Days)`}</p>
        </div>
      </div>
    </Link>
  </div> 
  )
}

export default UserClothCard