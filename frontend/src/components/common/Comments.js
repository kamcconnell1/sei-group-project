import React from 'react'

const Comments = ({ comment, deleteComment }) => {


  const edited = comment.createdAt.split('T')
  const date = edited[0]
  const time = edited[1].split('.')[0]
  return (
    <section className="comments-section">
      <div className="comments-each">
        <img src={comment.user.profilePic} alt={comment.user.username} height="100" width="100" />
        <div className="comments-content">
          <h6 className="author-of-comment">Written by <span className="username-span">{comment.user.username}</span></h6>
          <p className="main-review-words">{comment.text}</p>
          <p className="date-on-comment">{time} {date}</p>
        </div>
        <div className="review-buttons-div">
          <button onClick={deleteComment
          } value={comment._id} >Delete</button>
        </div>
      </div>
    </section >
  )
}

export default Comments
