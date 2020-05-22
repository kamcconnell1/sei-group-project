import React from 'react'

import { Slide } from 'react-slideshow-image'
import { Link } from 'react-router-dom'
import { isAuthenticated, isOwner } from '../../lib/auth'

import Comments from '../common/Comments'
import StarRating from '../common/StarRating'

// * Properties of slide tag
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
  onChange: (oldIndex, newIndex) => {
  }
}


const SingleClothCard = ({ deleteComment, rentalPrice, handleContactSubmit, handleContactChange, contactModalOpen, toggleContact, commentsArray, title, clothId, profilePic, username, images, image, onFirstClick, onSecondClick, onClick, handleCommentSubmit, handleCommentChange, rating, commentText, brand, color, category, genderCategory, size }) => {
  const slideImages = [image[0], image[0], image[0]]

  console.log(!isOwner());

  return (
    <>
      <section className="section">
        <div className="slide-container">
          <p><strong>Brand</strong> {brand}</p>
          <p><strong>{category}</strong> for {genderCategory}</p>
          <p><strong>Color</strong> {color}</p>
          <p><strong>Size</strong> {size}</p>
          <p><strong>Rental price</strong> £{rentalPrice}</p>
          <Slide {...properties}>
            <div className="each-slide">
              <div style={{ 'backgroundImage': `url(${slideImages[0]})` }}>
                <span></span>
              </div>
            </div>
            <div className="each-slide">
              <div style={{ 'backgroundImage': `url(${slideImages[1]})` }}>
                <span></span>
              </div>
            </div>
            <div className="each-slide">
              <div style={{ 'backgroundImage': `url(${slideImages[2]})` }}>
                <span></span>
              </div>
            </div>
          </Slide>
        </div>

        {isAuthenticated() && <button name="item" value={clothId} onClick={onClick} className="button is-small is-danger">Add to Favourites</button>}
        <br />
        {isAuthenticated() && <form onSubmit={handleCommentSubmit}>
          <div>
            <div className="label for comments">
              <p> Add a comment on {title} </p>
            </div>
            <textarea
              className="textarea is-small is-info"
              type="textArea"
              maxLength="250"
              name="text"
              onChange={handleCommentChange}
              value={commentText}
              placeholder="Add your comment"
            ></textarea>
          </div>
          <br />
          <div>
            <button className="button is-small is-info">Submit Comment</button>
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
        <Link to={`/page/${username}`}>
          <div className="container">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src={profilePic} alt={username} />
              </p>
            </figure>
            <p><strong>{username}</strong></p>
          </div>
        </Link>
        <div>
          <hr />
          <StarRating
            rating={rating}
            editing={false}
          />
        </div>
        <hr />
        <div className="show-buttons">
          {!isAuthenticated() && <div className="columns">
            <Link className="button is-success is-light" to="/login">SIGN IN</Link>
            <p className="or"> OR </p>
            <Link to="/register" className="button is-warning is-light">JOIN KEBB</Link>
          </div>}
          {isAuthenticated() && <button onClick={toggleContact} className="button is-primary is-small">CONTACT USER</button>}
        </div>
        <div className={contactModalOpen ? "modal is-active" : "modal"}>
          <div className="field">
            <form onSubmit={handleContactSubmit}>
              <div className="control">
                <textarea name="text" onChange={handleContactChange} className="textarea is-medium is-primary" placeholder="Message..."></textarea>
              </div>
              <button className="button is-small is-info">SEND</button>
            </form>
          </div>
        </div>
        <hr />
        <div className="columns similar">
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