import React from 'react'

import { Slide } from 'react-slideshow-image'

import {Link} from 'react-router-dom'

// !Slideshow needs work - Benga


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

const SingleClothCard = ({ title, profilePic, username, images, image, currentUserId, onFirstClick, onSecondClick }) => {
  const slideImages = [image[0], image[0], image[0]]
  // console.log(slideImages)
  return (
    <>
      <section className="section">
        <div className="slide-container">
          <Slide {...properties}>
            <div className="each-slide">
              <div className="slide" style={{'backgroundImage': `url(${slideImages[0]})`}}>
                <span>image 1</span>
              </div>
            </div>
            <div className="each-slide">
              <div className="slide" style={{'backgroundImage': `url(${slideImages[1]})`}}>
              <span>image 2</span>
              </div>
            </div>
            <div className="each-slide">
              <div className="slide" style={{'backgroundImage': `url(${slideImages[2]})`}}>
              <span>image 3</span>
              </div>
            </div>
          </Slide>
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
          <p>
              <strong>{username}</strong>
            </p>
            <p>Ratings go here</p>
          </div>
          <div>

            <div className="column is-one-quarter">
              <button onClick={onFirstClick}>
              <figure className="image">
                <img src={images[0].image} alt={title} />
              </figure>
              </button>
            </div>

            <div className="column is-one-quarter">
              <button onClick={onSecondClick}>
              <figure className="image">
                <img src={images[1].image} alt={title} />
              </figure>
              </button>
            </div>
        </div>
        </section>
  </>
  )
}

export default SingleClothCard
