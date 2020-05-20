import React from 'react'

import { Link } from 'react-router-dom'
import { isOwner, isAuthenticated } from '../../lib/auth'

const PostCards = ({ deletePost, photo, text, user, title, _id }) => {
  return (
      <div className="Card">
        <Link to={`/posts/${_id}`}>
          <div className="card-header">
            <h2>{title}</h2>
          </div>
          <div className="card-image">
            <figure className="image image is-1by1">
              <img src={photo} alt={title} loading="lazy" width="255" height="255" />
            </figure>
          </div>
          <div className="card-content">
            <h4 className=""><strong>{text}</strong></h4>
            <h5 className=""><strong>Posted by</strong> {user.username}</h5>
          </div>
        </Link>
        {isOwner(user._id) && <button onClick={deletePost} value={_id}>Delete</button>}
      </div>
  )
}

export default PostCards