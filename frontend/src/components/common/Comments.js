import React from 'react'
import { Link } from 'react-router-dom'

import { isOwner} from '../../lib/auth'

const Comments = ({ comment, deleteComment }) => {

  const edited = comment.createdAt.split('T')
  const date = edited[0]
  const time = edited[1].split('.')[0]
  return (
    <div className="Comment">
      {/* <div className="Comment-top"> */}
        <img className='comment-img' src={comment.user.profilePic} alt={comment.user.username} />
        {/* <div className="Comment-top-right"> */}
          <Link to={`/page/${comment.user.username}`}><h4 className='username'>{comment.user.username} </h4></Link>
          {/* <h5 className="Date"> @ {date}</h5> */}
        <p className='comment-text'>{comment.text}</p>
        {/* </div>
      </div> */}
      <div className="Delete">
        {isOwner(comment.user._id) && <button className="Button" onClick={deleteComment
        } value={comment._id} >X</button>}
      </div>
    </div>
  )
}

export default Comments

