import React from 'react'

import {Link} from 'react-router-dom'

const clothCard = ({_id, title, image, rentalPrice}) => {
  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <Link to={`/clothes/${_id}`}>
      <div className="card">
        <div className="card-header">
          <h4 className="card-header-title">{title}</h4>
        </div>
        <div className="card-image">
          <figure className="image image is-1by1">
            <img src={image} alt={title} loading="lazy" width="255" height="255" />
          </figure>
        </div>
        <div className="card-content">
          <h5 className="">{`£${rentalPrice}`}</h5>
        </div>
      </div>
    </Link>
  </div> 
  )
}

export default clothCard