import React from 'react'

import { singleCloth, getUserProfile, postFavorite } from '../../lib/api'

import SingleClothCard from './SingleClothCard'

class ClothesShow extends React.Component {

  state = {cloth: null, user: null, item: ''}

  // * GET each clothing item on mount via Id
  componentDidMount() {
    try {
      this.getSingleCloth()
    } catch (err) {
      console.log(err)
    }
  }

  // * Function to GET single clothing Item
  getSingleCloth = async () => {
    const clothId = this.props.match.params.id
    const res = await singleCloth(clothId)
      // console.log('clothes info:', res.data.user.id)
      const userId = res.data.user.id
      const user = await getUserProfile(userId)
      // console.log('user profile info:', user.data)
      this.setState({cloth: res.data, user: user.data})
  }

  // * Function to click on first picture in similar user post
  handleFirstClick = async () => {
    const clothId = this.props.match.params.id
    const res = await singleCloth(clothId)
    const userId = res.data.user.id
    const user = await getUserProfile(userId)
    const newCloth = user.data.createdArticles[0]
    const newClothId = user.data.createdArticles[0]._id
    this.setState({cloth: newCloth, user: user.data})
    this.props.history.push(`/clothes/${newClothId}`)
  }

// * Function to click on second picture in similar user post
  handleSecondClick = async () => {
    const clothId = this.props.match.params.id
    const res = await singleCloth(clothId)
    const userId = res.data.user.id
    const user = await getUserProfile(userId)
    const newCloth = user.data.createdArticles[1]
    const newClothId = user.data.createdArticles[1]._id
    this.setState({cloth: newCloth, user: user.data})
    this.props.history.push(`/clothes/${newClothId}`)
  }

  // * Function to add item to Favourite
  handleFavouriteSubmit =  async e => {
    try {
      const addToList = await { ...this.state.item, [e.target.name]: e.target.value }
      console.log(addToList)
      const res = await postFavorite(addToList)
      console.log(res)
      console.log('clicked')
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.cloth) return <h1>Even more Ninjas are working on this</h1>
    const {cloth, user} = this.state
    //* Variable of images from articles user posted
    const images = user.createdArticles.map(image => {return {image: image.image, id: image._id}})
    // Current users Id
    const userId = user._id
    // console.log(userId)
    const clothId = cloth._id
    // console.log(user)
    return (
      <>
        <section className="hero is-light">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {cloth.title}
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns">
              <SingleClothCard 
              {...cloth}
              {...user}
              images={images}
              currentUserId={userId}
              onFirstClick={this.handleFirstClick}
              onSecondClick={this.handleSecondClick}
              onClick={this.handleFavouriteSubmit}
              clothId={clothId}
              />
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default ClothesShow