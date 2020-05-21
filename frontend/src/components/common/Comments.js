import React from 'react'


const Comments = ({ comment, deleteComment }) => {


  const edited = comment.createdAt.split('T')
  const date = edited[0]
  const time = edited[1].split('.')[0]
  return (
    <div className="Comment">
      <div className="Comment-top">
        <img src={comment.user.profilePic} alt={comment.user.username} height="100" width="100" />
        <div className="Comment-top-right">
        <h4>By {comment.user.username}</h4>
        <h5 className="Date">{time} {date}</h5>
      </div>
      </div>
      

      <div className="Comment-text">
        <p>{comment.text}</p>
      </div>
      <div className="Delete">
        <button className="" onClick={deleteComment
        } value={comment._id} >Delete</button>
      </div>
    </div>
  )
}

export default Comments
