import React from 'react'

import { singleCloth, getUserProfile } from '../../lib/api'

import SingleClothCard from './SingleClothCard'

class ClothesShow extends React.Component {

  state = {cloth: null, user: null}

  // * GET each clothing item on mount via Id
  componentDidMount() {
    try {
      this.getSingleCloth()
    } catch (err) {
      console.log(err)
    }
  }

  getSingleCloth = async () => {
    const clothId = this.props.match.params.id
    const res = await singleCloth(clothId)
      // console.log('clothes info:', res.data.user.id)
      const userId = res.data.user.id
      const user = await getUserProfile(userId)
      // console.log('user profile info:', user.data)
      this.setState({cloth: res.data, user: user.data})
  }

  handleClick = async () => {
    console.log('clicks')
    const clothId = this.props.match.params.id
    const res = await singleCloth(clothId)
    const userId = res.data.user.id
    const user = await getUserProfile(userId)
    const newCloth = user.data.createdArticles[0]
    this.setState({cloth: newCloth, user: user.data})
  }

  render() {
    if (!this.state.cloth) return <h1>Even more Ninjas are working on this</h1>
    const {cloth, user} = this.state
    //* Variable of images from articles user posted
    const images = user.createdArticles.map(image => {return {image: image.image, id: image._id}})
    // Current users Id
    const userId = user._id
    console.log(userId)
    return (
      <>
        <section className="hero is-light">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Item show page
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
              onClick={this.handleClick}
              />
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default ClothesShow