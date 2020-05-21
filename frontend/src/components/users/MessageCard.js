import React from 'react'

const MessageCard = ({ user, text, createdAt, reply, _id, sendReply, replyModal, replyChange, response }) => {
  const edited = createdAt.split('T')
  const date = edited[0]
  const time = edited[1].split('.')[0]
  // const resCreatAt = response.map(res => res.createdAt)
  // const resEdited = resCreatAt.map(res => res.split('T'))
  // const resDate = resEdited.map(res => res[0])
  // const resTime = resEdited.map(res => res[1].split('.')[0])

  return (
    <>
      <h4>From <strong>{user.username}</strong></h4>
      <div className="columns">
        <figure className="media-left column">
          <p className="image is-64x64">
            <img src={user.profilePic} alt={user.username} />
          </p>
        </figure>
        <div className="column">
          <p><span>{`${date} - ${time}`}: </span>{text}</p>
          <hr />
          {response.map((res, i) => <div  key={i}> <span>Reply: </span>  <p> <span>{res.createdAt.split('T')}</span> {res.text}</p><hr/></div> )}
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