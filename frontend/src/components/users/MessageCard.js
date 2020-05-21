import React from 'react'

const MessageCard = ({ user, text, createdAt, reply, _id, sendReply, replyModal, replyChange, response }) => {
  // console.log(response.map(res => res.text))
  return (
    <>
      <div className="Message">
      <div className="Message-top">
        <img
          src={user.profilePic}
          className="Message-user-avatar" />

        <div className="Message-from-date">
          <h4>From {user.username}<span>{createdAt}</span></h4>
          <h3>{text}</h3>
        </div>
      </div>

      <div className="Message-content">
        {response.map((res, i) => <p key={i} >{res.text}</p>)}
      </div>
      <div className="Message-reply-delete">
        <button value={_id} onClick={reply} className="button is-info">Reply</button>
        <button className="button is-danger">Delete</button>
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
      </div>
      </div>
    </>

  )
}

export default MessageCard