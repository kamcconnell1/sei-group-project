import React from 'react'

import StarRatingComponent from 'react-star-rating-component'

const StarRating = ({rating, onStarClick}) => {

  return (
    <div>
      <h2>Rating from state: {rating}</h2>
      <StarRatingComponent
        name="rating"
        starCount={5}
        value={rating}
        onStarClick={onStarClick}
      />
    </div>
  )
}

export default StarRating