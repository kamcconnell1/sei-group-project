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

  return (
    <>
      <section className="Cloth-card-left">
        <div className="slide-container">
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

      </section>

      <section className="Cloth-card-right">
        <div className="info-wrapper">
          <div className="item-info">
            <p><strong>Brand:  </strong>  {brand}</p>
            <p><strong>{category}:  </strong>  {genderCategory}</p>
            <p><strong>Color:  </strong>  {color}</p>
            <p><strong>Size:  </strong>  {size}</p>
            <p><strong>Rental price:  </strong>  £{rentalPrice}</p>
        {isAuthenticated() && <button name="item" value={clothId} onClick={onClick} className="favourite-btn">❤️ Love!</button>}
          </div>
          <div className="user-info">
            <Link to={`/page/${username}`}>
              <div className="container">
                <p className="username"><strong>{username}</strong></p>
                <img src={profilePic} alt={username} />
              </div>
            </Link>
            <StarRating
              rating={rating}
              editing={false}
            />
            <div className="show-buttons">
              {!isAuthenticated() ? <div className="columns">
                <Link to="/login">SIGN IN</Link>
                <p className="or"> OR </p>
                <Link to="/register">JOIN KEBB</Link>
              </div> : <button onClick={toggleContact} className="Button">CONTACT</button>}
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
          </div>
        </div>
        <hr />
        
        <div className='comments'>
        {isAuthenticated() && <form onSubmit={handleCommentSubmit}>
            <div className="comments-label">
              <p>Comment on {title} </p>
            </div>
          <div className="comment-box">
            <textarea
              rows="2"
              type="textArea"
              maxLength="250"
              name="text"
              onChange={handleCommentChange}
              value={commentText}
              placeholder="Add your comment..."
            ></textarea>
            <button className="Button">Post Comment</button>
          </div>
        </form>}
        
          {commentsArray.length === 0? 
          <p className='no-comments'>Nobody has commented on this item yet. <br /> Be the first to comment now!</p>
          : 
          commentsArray.map(comment => (
            <Comments
              key={comment._id}
              comment={comment}
              deleteComment={deleteComment}
            />
          ))}
        </div>

        <hr />

        <div className="rent-wardrobe">
          <p className="username">Rent {username}'s Wardrobe</p> <br />
          <div className="columns similar">
            <div className="column is-one-quarter">
              <a onClick={onFirstClick}>
                  <img  className='other-items' src={images[0].image} alt={title} />
              </a>
            </div>

            <div className="column is-one-quarter">
              <a onClick={onSecondClick}>
                  <img className='other-items' src={images[1].image} alt={title} />
              </a>
            </div>
            <div className="column is-one-quarter">
              <a onClick={onSecondClick}>
                  <img className='other-items' src={images[2].image} alt={title} />
              </a>
            </div>
            <div className="column is-one-quarter">
              <a onClick={onSecondClick}>
                  <img className='other-items' src={images[3].image} alt={title} />
              </a>
            </div>
          </div>
        </div>

      </section>


    </>
  )
}

export default SingleClothCard