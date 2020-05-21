import React from 'react'

import { Slide } from 'react-slideshow-image'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'

import Comments from '../common/Comments'
import StarRating from '../common/StarRating'

// !Slideshow needs work - Benga

// * properties of slide tag
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
  onChange: (oldIndex, newIndex) => {
    // console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}


const SingleClothCard = ({ deleteComment, handleContactSubmit, handleContactChange, contactModalOpen, toggleContact, commentsArray, comments, title, clothId, profilePic, username, images, image, currentUserId, onFirstClick, onSecondClick, onClick, location, handleCommentSubmit, handleCommentChange, rating }) => {
  const slideImages = [image[0], image[0], image[0]]

  return (
    <>
      <section className="section">
        <div className="slide-container">
          <Slide {...properties}>
            <div className="each-slide">
              <div style={{ 'backgroundImage': `url(${slideImages[0]})` }}>
                <span>Slide 1</span>
              </div>
            </div>
            <div className="each-slide">
              <div style={{ 'backgroundImage': `url(${slideImages[1]})` }}>
                <span>Slide 2</span>
              </div>
            </div>
            <div className="each-slide">
              <div style={{ 'backgroundImage': `url(${slideImages[2]})` }}>
                <span>Slide 3</span>
              </div>
            </div>
          </Slide>
        </div>

        {isAuthenticated() && <button name="item" value={clothId} onClick={onClick} className="button is-dark">Add to Favourites</button>}
        {isAuthenticated() && <form onSubmit={handleCommentSubmit}>
          <div>
            <div className="label for comments">
              <p> Comment on {title} </p>
            </div>
            <input
              className="comments-input"
              type="textArea"
              maxLength="250"
              name="text"
              onChange={handleCommentChange}
              value={comments.text} />
          </div>
          <div className="comments-submit-button">
            <button className="button is-primary">Submit Comment</button>
          </div>
        </form>}
        <div>
          {commentsArray.map(comment => (
            <Comments
              key={comment._id}
              comment={comment}
              deleteComment={deleteComment}
            />
          ))}
        </div>
      </section>
      <section className="section">
        <Link to={`/page/${currentUserId}`}>
          <div className="container">
            <figure className="media-right">
              <p className="image is-64x64">
                <img src={profilePic} alt={username} />
              </p>
            </figure>
          </div>
        </Link>
        <div>
          <br />
          <p>
            <strong>{username}</strong>
          </p>
          <hr />
          <StarRating 
          rating={rating}
          editing={false}
          />
        </div>
        <hr />
        <div>
          {!isAuthenticated() && <div className="columns">
            <Link className="sign-in-button column" to="/login" className="button is-info">SIGN IN</Link>
            <p> OR </p>
            <Link className="join-button column" to="/register" className="button is-primary">JOIN KEBB</Link>
          </div>}
          {isAuthenticated() && <button onClick={toggleContact} className="button is-primary">Contact User</button>}
        </div>
        <div className={contactModalOpen ? "modal is-active" : "modal"}>
          <div className="field">
            <form onSubmit={handleContactSubmit}>
              <div className="control">
                <textarea name="text" onChange={handleContactChange} className="textarea is-medium is-primary" placeholder="Message..."></textarea>
              </div>
              <button className="button is-info">SEND</button>
            </form>
          </div>
        </div>
        <hr />
        <div className="columns">
          <div className="column is-one-quarter">
            <a onClick={onFirstClick}>
              <figure className="image">
                <img src={images[0].image} alt={title} />
              </figure>
            </a>
          </div>

          <div className="column is-one-quarter">
            <a onClick={onSecondClick}>
              <figure className="image">
                <img src={images[1].image} alt={title} />
              </figure>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default SingleClothCard
