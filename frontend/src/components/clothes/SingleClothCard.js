import React from 'react'

import { Slide } from 'react-slideshow-image'

// !Slideshow needs work - Benga


const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}

const SingleClothCard = ({ title, profilePic, username, createdArticles, images, image }) => {
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
        {/* <div className="columns">
        <div className="container">
          <div className="column is-half">
            <h4 className="title is-4">{title}</h4>
            <figure className="image">
              <img src={image[0]} alt={title} />
            </figure>
          </div>
        </div>
        <div className="column">
        <div className="show-img column is-one-quarter">
          <figure className="media-left">
            <p className="image is-64x64">
              <img src={image[0]}/>
            </p>
          </figure>
        </div>
        <div className="show-img column is-one-quarter">
          <figure className="media-left">
            <p className="image is-64x64">
              <img src={image[0]}/>
            </p>
          </figure>
        </div>
        <div className="show-img column is-one-quarter">
          <figure className="media-left">
            <p className="image is-64x64">
              <img src={image[0]}/>
            </p>
          </figure>
        </div>
      </div>
      </div> */}
  </section>
        {/* <section className="section">
          <div className="container">
            <figure className="media-right">
              <p className="image is-64x64">
                <img src={profilePic} alt={username} />
              </p>
            </figure>
            <p>
              <strong>{username}</strong>
            </p>
            <p>Ratings go here</p>
          </div>
          <div>
            <div className="show-img column is-one-quarter">
              <figure className="image">
                <img src={images[Math.floor(Math.random() * images.length)]} alt={title} />
              </figure>
            </div>
            <div className="show-img column is-one-quarter">
              <figure className="image">
                <img src={images[Math.floor(Math.random() * images.length)]} alt={title} />
              </figure>
            </div>
          </div>
        </section> */}
  </>
  )
}

export default SingleClothCard