import React from 'react'
import { Link } from 'react-router-dom'

import { getUserProfile, postFavoriteFriend, commentOnUser, DeleteCommentOnUser, sendMessage, rateUser } from '../../lib/api'
import { getPostcodeInfo } from '../../lib/ext_api'
import { isAuthenticated } from '../../lib/auth'
import { addedRatingToast } from '../../lib/toasts'

import Comments from '../common/Comments'
import StarRating from '../common/StarRating'

class userShowProfile extends React.Component {
  state = {
    user: null,
    location: '',
    userItems: null,
    friend: '',
    comments: {
      text: ''
    },
    commentsArray: [],
    contactModalOpen: false,
    text: '',
    ratingData: {
      rating: ''
    }
  }

  async componentDidMount() {
    try {
      await this.getUser()
    } catch (err) {
      console.log(err)
    }
  }

  getUser = async () => {
    try {
      const userId = this.props.match.params.username
      console.log(userId)
      const res = await getUserProfile(userId)
      const userItems = res.data.createdArticles
      this.setState({ user: res.data, userItems, commentsArray: res.data.comments, })
      this.getLocation()
    } catch (err) {
      console.log(err)
    }
  }

  //* Function to find user location details
  async getLocation() {
    try {
      const postcode = this.state.user.postcode
      const response = await getPostcodeInfo(postcode)
      const nuts = response.data.result.nuts
      const region = response.data.result.region
      this.setState({ location: `${nuts}, ${region}` })
    } catch (err) {
      const latitude = 51.515419
      const longitude = -0.141099
      this.setState({ location: 'London, UK', latitude, longitude })
    }
  }

  // * Function to toggle contact modal
  toggleContactModal = () => {
    this.setState({ contactModalOpen: !this.state.contactModalOpen })
  }

  // * Function to handle change of contact box
  handleContactChange = e => {
    const text = { ...this.state.text, [e.target.name]: e.target.value }
    this.setState({ text })
  }

  // * Function to submit message
  handleContactSubmit = async e => {
    e.preventDefault()
    const userId = this.state.user._id
    try {
      await sendMessage(userId, this.state.text)
    } catch (err) {
      console.log(err)
    }
    this.setState({ contactModalOpen: false })
  }

  // * Function to add poster to friends
  handleFriendSubmit = async e => {
    try {
      const addToList = await { ...this.state.friend, [e.target.name]: e.target.value }
      console.log(addToList)
      const res = await postFavoriteFriend(addToList)
      console.log(res.data)
      console.log('sent')
    } catch (err) {
      console.log(err)
    }
  }

  //* Handle Comments on User
  handleCommentChange = e => {
    const comments = { ...this.state.comments, [e.target.name]: e.target.value }
    this.setState({ comments })
  }

  //* Submit Comment on User
  handleCommentSubmit = async e => {
    e.preventDefault()
    try {
      const res = await commentOnUser(this.state.user._id, this.state.comments)
      console.log(res.data)
      this.setState({ commentsArray: res.data.comments, comments: { ...this.state.comments, text: '' } })
      this.getUser()
    } catch (err) {
      console.log(err)
    }
  }

  //* Delete Comments on User
  deleteComment = async e => {
    try {
      const commentId = e.target.value
      await DeleteCommentOnUser(this.state.user._id, commentId)
      console.log('sucess')
      this.getUser()
    } catch (err) {
      console.log(err)
    }
  }

  //* Function to get the page Users ratings - I they haven't been rated yet you start on 3 stars
  getUserRating = () => {
    const ratings = this.state.user.ratings
    if (ratings.length === 0) return 3
    return (Math.round((Object.values(ratings).reduce((a, { rating }) =>
      a + rating, 0) / ratings.length)))
  }


  //* ON Clicking the star sets state 
  onStarClick = (nextValue) => {
    if (!isAuthenticated()) return
    addedRatingToast()
    const ratingData = { ...this.state.ratingData, rating: nextValue }
    this.setState({ ratingData }
      , () => {
        this.submitUserRating()
      })
  }

  // addedRatingToast = () => {
  //   return toast('Thankyou, rating has been added')
  // }

  //*POST rating on the user
  async submitUserRating() {
    try {
      const userId = this.state.user._id
      const res = await rateUser(userId, this.state.ratingData)
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }


  render() {
    if (!this.state.user) return <h1>User kidnapped, Ninja to the rescue</h1>

    const rating = parseInt(this.getUserRating())
    const { user, userItems, comments, commentsArray, contactModalOpen } = this.state
    const { location } = this.state
    return (
      <>
        <div className="Show-profile">
          <div className="Show-profile-top">
            <div className="Photo-user-rating">
              <img src={user.profilePic} alt={user.username} />
              <h4 className="Username">{user.username}</h4>
              <h6 className="User-location">{location}</h6>
              <StarRating
                rating={rating}
                onStarClick={this.onStarClick}
              />

              <div className="Follow-message">
                <div className="Follow-btn">
                  {isAuthenticated() && <button name="friend" value={user._id} onClick={this.handleFriendSubmit} className="Button">Follow</button>}
                </div>
                <div className="Message">
                  {isAuthenticated() && <button onClick={this.toggleContactModal} className="Button">Message</button>}

                  <div className="Modal-Message">
                    <div className={contactModalOpen ? "modal is-active" : "modal"}>
                      <div className="field">
                        <form onSubmit={this.handleContactSubmit}>
                          <div className="control">
                            <textarea
                              name="text"
                              onChange={this.handleContactChange}
                              name="text"
                              className="textarea is-medium is-primary"
                              placeholder="Message..."></textarea>
                          </div>
                          <button className="button is-info">SEND</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>


            <div className="Comments-container">
              <h3>{user.username}'s Reviews</h3>
              {
                isAuthenticated() && <section className="Comments">
                  <form
                    className="Comment-left"
                    onSubmit={this.handleCommentSubmit}>
                    <p> Your review for {user.username}:</p>
                    <textarea
                      className="Comment-text"
                      rows="5"
                      type="textArea"
                      maxLength="200"
                      name="text"
                      onChange={this.handleCommentChange}
                      value={comments.text} />
                    <button className="Submit">Submit Comment</button>
                  </form>

                  <div className="Comments-on-user">
                    {commentsArray.map(comment => (
                      <Comments
                        key={comment._id}
                        comment={comment}
                        deleteComment={this.deleteComment}
                      />
                    ))}

                  </div>
                </section>
              }

            </div>

          </div>

          <div className="Show-profile-bottom">
            <div className="User-items-index">
              {userItems.map(item =>
                <div key={item._id}>
                  <Link to={`/clothes/${item._id}`}>
                    <div className="Card">
                      <div className="img">
                        <img src={item.image} alt={item.title} loading="lazy" width="255" height="255" />
                      </div>
                      <div className="Card-text">
                        <h4 className="Title">{item.title}</h4>
                        <h5 className="Subtitle">Rent it for: <strong>{`£${item.rentalPrice}`}</strong></h5>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>


      </>
    )
  }


}

export default userShowProfile