import React from 'react'

import { Link } from 'react-router-dom'

const PostCards = ({}) => {
  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <Link to={`/posts/`}>
      <div className="card">
        <div className="card-header">
        </div>
        <div className="card-image">
          <figure className="image image is-1by1">
            {/* <img src={} alt={} loading="lazy" width="255" height="255" /> */}
          </figure>
        </div>
        <div className="card-content">
          <h4 className=""><strong>{}</strong></h4>
          <h5 className=""><strong>Rental Price:</strong> {`s`}</h5>
        </div>
      </div>
    </Link>
  </div> 
  )
}

export default PostCards