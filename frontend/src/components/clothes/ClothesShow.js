import React from 'react'

import { singleCloth, sendMessage, getUserProfile, postFavorite, addCommentCloth, deleteCommentCloth } from '../../lib/api'

import SingleClothCard from './SingleClothCard'

class ClothesShow extends React.Component {

  state = {
    cloth: null, 
    user: null, 
    item: '',
    comments: {
    text: ''
    },
    commentsArray: [],
    contactModalOpen: false,
    text: '', 
    rating: 2
  }

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
      this.setState({cloth: res.data, user: user.data, commentsArray: res.data.comments })
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

  // * Function to toggle contact button
  toggleContactModal = () => {
    this.setState({ contactModalOpen: !this.state.contactModalOpen })
  }

  // * Function to handle change of contact box
  handleContactChange = e => {
    const text = {...this.state.text, [e.target.name]: e.target.value}
    this.setState({text})
  }

  // * Function to submit message to user
  handleContactSubmit = async e => {
    e.preventDefault()
    const {user} = this.state
    const userId = user.id
    try {
      await sendMessage(userId, this.state.text)
    } catch (err) {
      console.log(err)
    }
    this.setState({contactModalOpen: false})
  }

  handleCommentChange = e => {
    const comments = { ...this.state.comments, [e.target.name]: e.target.value}
    this.setState({ comments })
  }

  handleCommentSubmit = async e => {
    const clothId = this.props.match.params.id
    e.preventDefault()
    try {
      const res = await addCommentCloth(clothId, this.state.comments)
      this.setState({ commentsArray: res.data.comments })
      this.getSingleCloth()
    } catch (err) {
      console.log(err)
    }
  }

  deleteComment = async e => {
    try {
      const clothId = this.props.match.params.id
      const commentId = e.target.value
      await deleteCommentCloth(clothId, commentId)
      this.getSingleCloth()
    } catch (err) {
      console.log(err)
    }
  }

//* StarRating function
onStarClick(nextValue, prevValue, name) {
  // console.log(nextValue);
  
  console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
  // this.setState({rating: nextValue});
}

  render() {
    if (!this.state.cloth) return <h1>Even more Ninjas are working on this</h1>
    const {cloth, user, comments, commentsArray, contactModalOpen } = this.state

    //* Variable of images from articles user posted
    const images = user.createdArticles.map(image => {return {image: image.image, id: image._id}})
    // Current users Id
    const userId = user._id
    // Cloth Id
    const clothId = cloth._id
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
              {...comments}
              commentsArray={commentsArray}
              deleteComment={this.deleteComment}
              handleCommentChange={this.handleCommentChange}
              handleCommentSubmit={this.handleCommentSubmit}
              images={images}
              currentUserId={userId}
              onFirstClick={this.handleFirstClick}
              onSecondClick={this.handleSecondClick}
              onClick={this.handleFavouriteSubmit}
              clothId={clothId}
              toggleContact={this.toggleContactModal}
              contactModalOpen={contactModalOpen}
              handleContactChange={this.handleContactChange}
              handleContactSubmit={this.handleContactSubmit}
              onStarClick={this.onStarClick}
              rating={this.state.rating}
              />
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default ClothesShow