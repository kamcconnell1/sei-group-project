import React from 'react'

import StarRatingComponent from 'react-star-rating-component'

const StarRating = ({ rating, onStarClick }) => {

  return (
    <div>
      <StarRatingComponent
        name="rating"
        starCount={5}
        value={rating}
        onStarClick={onStarClick}
        starColor="#fdfbfd"
        emptyStarColor="#6c7f9a"
      />
    </div>
  )
}

export default StarRating