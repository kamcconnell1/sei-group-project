import React from 'react'

const SingleClothCard = ({image, title, profilePic, username, createdArticles, images }) => {
  return(
    <>
    <section className="section">
    <div className="container">
    <div className="show-img column is-half">
      <h4 className="title is-4">{title}</h4>
          <figure className="image">
            <img src={image} alt={title} />
          </figure>
        </div>
    </div>
    <div>
      Description
    </div>
  </section>
  <section className="section">
    <div className="container">
    <figure className="media-right">
    <p className="image is-64x64">
      <img src={profilePic} alt={username}/>
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
  </section>
  </>
  )
}

export default SingleClothCard