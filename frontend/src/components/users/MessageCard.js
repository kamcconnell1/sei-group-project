import React from 'react'

const MessageCard = ({ user, text, createdAt }) => {
  // console.log(user)
  return (
    <>
      <h4>From <strong>{user.username}</strong></h4>
      <div className="columns">
        <figure className="media-left column">
          <p className="image is-64x64">
            <img src={user.profilePic} />
          </p>
        </figure>
        <div className="column">
          <p>Message</p>
          <p><span>{createdAt}</span>{text}</p>
        </div>
      </div>
      <div className="columns">
        <button className="button is-info">Reply</button>
        <button className="button is-danger">Delete</button>
      </div>
      <hr />
    </>

  )
}

export default MessageCard