import React from 'react'

import {Link} from 'react-router-dom'

const UserClothCard = ({_id, title, image, rentalPrice}) => {
  return (
<<<<<<< HEAD
    <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <Link to={`/clothes/${_id}`}>
      <div className="card">
        <div className="card-header">
          <h4 className="card-header-title">{title}</h4>
        </div>
=======
    <div className="column is-half">
    <Link to={`/clothes/${_id}`}>
      <div className="card">
>>>>>>> 8f04e88d792cb017a90b847f2376ce335979bce7
        <div className="card-image">
          <figure className="image image is-1by1">
            <img src={image[0]} alt={title} loading="lazy" width="255" height="255" />
          </figure>
        </div>
        <div className="card-content">
<<<<<<< HEAD
          <h5 className="">{`£${rentalPrice}`}</h5>
=======
          <p className="title is-5">{title}</p>
          <p className="subtitle is-6">{`Rent £${rentalPrice} (7 Days)`}</p>
>>>>>>> 8f04e88d792cb017a90b847f2376ce335979bce7
        </div>
      </div>
    </Link>
  </div> 
  )
}

export default UserClothCard