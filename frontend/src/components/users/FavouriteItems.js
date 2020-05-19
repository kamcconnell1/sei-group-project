import React from 'react'

import { allUsersFavourites } from '../../lib/api'

class FavouriteItem extends React.Component{

  async componentDidMount () {
    const res = await allUsersFavourites()
    console.log(res.data)
  }



  render() {
    return (
      <h1>Favourite Items</h1>
    )
  }
}

export default FavouriteItem