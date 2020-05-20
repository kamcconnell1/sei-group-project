import React from 'react'

import StarRatingComponent from 'react-star-rating-component'

const StarRating = ({rating, onStarClick}) => {

  return (
    <div>
      <StarRatingComponent
        name="rating"
        starCount={5}
        value={rating}
        onStarClick={onStarClick}
        starColor="#708090"
      />
    </div>
  )
}

export default StarRating