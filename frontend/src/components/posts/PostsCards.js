import React from 'react'

import { Link } from 'react-router-dom'

const PostCards = ({ photo, text, user, title, _id }) => {
  return (
    <div className="Card">
      <Link to={`/posts/${_id}`}>
        <div className='card-content'>
            <img className="Post-image" src={photo} alt={title} loading="lazy"  />
        <div className="Post-right">
          <h2 className='Title'>{title}</h2>
          <div className="Text">
            <h4 className="Post-content">{text}</h4>
            <h5 className="Post-author">Posted by {user.username}</h5>
          </div>
        </div>
        </div>
      </Link>
    </div>
  )
}

export default PostCards