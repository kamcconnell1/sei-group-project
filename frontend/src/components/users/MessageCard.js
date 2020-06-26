import React from 'react'
import { Link } from 'react-router-dom'

const MessageCard = ({ user, text, createdAt, reply, _id, sendReply, replyModal, replyChange, response }) => {
  const edited = createdAt.split('T')
  const date = edited[0]
  const time = edited[1].split('.')[0]

  return (
    <div className='message-card'>
        <div className="Message">
          <div className="Message-top">
            <img src={user.profilePic} alt={user.username} />
            <div className="Message-top-right">
              <Link to={`/page/${user.username}`}><h4>{user.username}</h4></Link>
              <h5>{`${date} at ${time}`}:</h5>
            </div>
          </div>
          <div className="Message-text">
            <p>{text}</p>
            <hr />
          </div>
          <div className="Message-reply">
            {response.map((res, i) =>
              <div key={i}>
                <h5>Reply @ {date} {time}</h5>
                <p>{res.text}</p>
                <div className="Message-content">
                </div>
              </div>)}
            <button value={_id} onClick={reply} className="Button">Reply</button>
          </div>
        </div>
        <div className="Message-reply-delete">
          <div className={replyModal ? "modal is-active" : "modal"}>
            <div className="field">
              <form onSubmit={sendReply}>
                <div className="control">
                  <textarea
                    onChange={replyChange}
                    name="text"
                    className="textarea is-medium is-primary"
                    placeholder="Message..."></textarea>
                </div>
                <button className="button is-info">SEND</button>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}

export default MessageCard