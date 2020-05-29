import React from 'react'
import { Link } from 'react-router-dom'

import { isOwner} from '../../lib/auth'

const Comments = ({ comment, deleteComment }) => {

  const edited = comment.createdAt.split('T')
  const date = edited[0]
  const time = edited[1].split('.')[0]
  return (
    <div className="Comment">
      <div className="Comment-top">
        <img src={comment.user.profilePic} alt={comment.user.username} height="100" width="100" />
        <div className="Comment-top-right">
          <Link to={`/page/${comment.user.username}`}><h4>{comment.user.username} </h4></Link>
          <h5 className="Date">@ {time} {date}</h5>
        <p>{comment.text}</p>
        </div>
      </div>
      <div className="Delete">
        {isOwner(comment.user._id) && <button className="Button" onClick={deleteComment
        } value={comment._id} >Delete</button>}
      </div>
    </div>
  )
}

export default Comments

