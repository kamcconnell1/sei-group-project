import React from 'react'

import { Slide } from 'react-slideshow-image'

import { Link } from 'react-router-dom'

import { isAuthenticated } from '../../lib/auth'

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

const SingleClothCard = ({ title, clothId, profilePic, username, images, image, currentUserId, onFirstClick, onSecondClick, onClick, location }) => {
  const slideImages = [image[0], image[0], image[0]]
  // console.log(slideImages)
  return (
    <>
      <section className="section">
        <div className="slide-container">
          <Slide {...properties}>
            <div className="each-slide">
              <div className="slide" style={{ 'backgroundImage': `url(${slideImages[0]})` }}>
                <span>image 1</span>
              </div>
            </div>
            <div className="each-slide">
              <div className="slide" style={{ 'backgroundImage': `url(${slideImages[1]})` }}>
                <span>image 2</span>
              </div>
            </div>
            <div className="each-slide">
              <div className="slide" style={{ 'backgroundImage': `url(${slideImages[2]})` }}>
                <span>image 3</span>
              </div>
            </div>
          </Slide>
        </div>
        {isAuthenticated() && <button name="item" value={clothId} onClick={onClick} className="button is-dark">Add to Favourites</button>}
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
          <p>Ratings go here</p>
        </div>
        <hr />
        <div>
          {!isAuthenticated() && <div className="columns">
          <Link className="column" to="/login" className="button is-danger">Sign IN</Link>
          <p>OR</p>
          <Link className="column" to="/register" className="button is-danger">JOIN KEBB</Link>
          </div>}
          {isAuthenticated() && <button className="button is-primary">Contact User</button>}
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
