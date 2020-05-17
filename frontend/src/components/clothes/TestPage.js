import React from 'react'

import StarRatings from 'react-star-ratings'



class TestPage extends React.Component {
  state = {ratings: ['1', '2', '3,', '4', '5']}

  render() {
    
    return (
    // <StarRatings 
    // rating={this.state.ratings}
    // starRatedColor="blue"
    // numberOfStars={5}
    // name='rating'
    // changeRating={this.changeRating}
    // />
    <h1>Star rating</h1>
    )
  }
}

export default TestPage