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
      />
    </div>
  )
}

export default StarRating