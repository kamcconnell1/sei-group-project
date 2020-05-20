import React from 'react'

const MessageCard = ({ user, text, createdAt, reply, _id, sendReply, replyModal, replyChange, response }) => {
  // console.log(response.map(res => res.text))
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
          {response.map((res, i) => <p key={i} >{res.text}</p>)}
        </div>
      </div>
      <div className="columns">
        <button value={_id} onClick={reply} className="button is-info">Reply</button>
        <button className="button is-danger">Delete</button>
      </div>
      <hr />
      <div className={replyModal ? "modal is-active" : "modal"}>
        <div className="field">
          <form onSubmit={sendReply}>
            <div className="control">
              <textarea onChange={replyChange} name="text" className="textarea is-medium is-primary" placeholder="Message..."></textarea>
            </div>
            <button className="button is-info">SEND</button>
          </form>
        </div>
      </div>
    </>

  )
}

export default MessageCard