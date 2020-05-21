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
      this.setState({ commentsArray: res.data.comments, comments: {...this.state.comments, text: ''} })
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



  // render() {
  //   if (!this.state.user) return <h1>User kidnapped, Ninja to the rescue</h1>

  //   const rating = parseInt(this.getUserRating())
  //   const { user, userItems, comments, commentsArray, contactModalOpen } = this.state
  //   const {location} = this.state
  //   return (
  //     <>
  //       <section>
  //         <div className="container">
  //           <figure className="media-right">
  //             <p className="image is-64x64">
  //               <img src={user.profilePic} alt={user.username} />
  //             </p>
  //           </figure>
  //         </div>
  //         <div>
  //           <h4 className="title is-3">{user.username}</h4>
  //         </div>
  //         <div>
  //           <StarRating
  //             rating={rating}
  //             onStarClick={this.onStarClick}
  //           />
  //         </div>
  //         <div>
  //         <h6 className="subtitle">{location}</h6>
  //         </div>
  //         <div className="columns">
  //           <div className="column">
  //             {isAuthenticated() && <button name="friend" value={user._id} onClick={this.handleFriendSubmit} className="button is-primary">Follow</button>}
  //           </div>
  //           <div className="column">
  //             {isAuthenticated() && <button onClick={this.toggleContactModal} className="button is-primary">Message</button>}
  //           </div>
  //         </div>
  //         <div className={contactModalOpen ? "modal is-active" : "modal"}>
  //           <div className="field">
  //             <form onSubmit={this.handleContactSubmit}>
  //               <div className="control">
  //                 <textarea 
  //                 name="text" 
  //                 onChange={this.handleContactChange} 
  //                 name="text" 
  //                 className="textarea is-medium is-primary" 
  //                 placeholder="Message..."></textarea>
  //               </div>
  //               <button className="button is-info">SEND</button>
  //             </form>
  //           </div>
  //         </div>
  //       </section>
  //       <section className="section">
  //         <div className="container">
  //           <div className="columns is-multiline">
  //             {userItems.map(item =>
  //               <div key={item._id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
  //                 <Link to={`/clothes/${item._id}`}>
  //                   <div className="card">
  //                     <div className="card-header">
  //                       <h4 className="card-header-title">{item.title}</h4>
  //                     </div>
  //                     <div className="card-image">
  //                       <figure className="image image is-1by1">
  //                         <img src={item.image} alt={item.title} loading="lazy" width="255" height="255" />
  //                       </figure>
  //                     </div>
  //                     <div className="card-content">
  //                       <h5 className=""><strong>Rental Price:</strong> {`£${item.rentalPrice}`}</h5>
  //                     </div>
  //                   </div>
  //                 </Link>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       </section>
  //       {isAuthenticated() && <section>
  //         <form onSubmit={this.handleCommentSubmit}>
  //           <div>
  //             <div className="label for comments">
  //               <p> Comment on {user.username} </p>
  //             </div>
  //             <input
  //               className="comments-input"
  //               type="textArea"
  //               maxLength="250"
  //               name="text"
  //               onChange={this.handleCommentChange}
  //               value={comments.text} />
  //           </div>
  //           <div className="comments-submit-button">
  //             <button className="button is-primary">Submit Comment</button>
  //           </div>
  //         </form>
  //         <div>
  //           {commentsArray.map(comment => (
  //             <Comments
  //               key={comment._id}
  //               comment={comment}
  //               deleteComment={this.deleteComment}
  //             />
  //           ))}
  //         </div>
  //       </section>}
  //     </>
  //   )
  // }


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
              <h4 className="title is-3">{user.username}</h4>
              <h6 className="subtitle">{location}</h6>
              <StarRating
                rating={rating}
                onStarClick={this.onStarClick}
              />
            </div>
            <div className="Follow-message-comment">
              <div className="Follow-btn">
                {isAuthenticated() && <button name="friend" value={user._id} onClick={this.handleFriendSubmit} className="button is-primary">Follow</button>}
              </div>
              <div className="Message">
                {isAuthenticated() && <button onClick={this.toggleContactModal} className="button is-primary">Message</button>}

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
            
            <div className="Comments">
              {
                isAuthenticated() && <section>
                  <form onSubmit={this.handleCommentSubmit}>
                    <div className="Comment-top">
                      <p> Leave a comment about {user.username} </p>
                    </div>
                    <input
                      className="Comment-text"
                      type="textArea"
                      maxLength="250"
                      name="text"
                      onChange={this.handleCommentChange}
                      value={comments.text} />

                    <div className="Comment-bottom">
                      <button className="Submit">Submit Comment</button>
                    </div>
                  </form>
                  <div>
                    <div className="Comments-on-user">
                      {commentsArray.map(comment => (
                        <Comments
                          key={comment._id}
                          comment={comment}
                          deleteComment={this.deleteComment}
                        />
                      ))}
                    </div>

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
                        <h4 className="Title">{item.title}</h4>
                      <div className="img">
                        <img src={item.image} alt={item.title} loading="lazy" width="255" height="255" />
                      </div>
                      <div className="Card-text">
                        <h5 className=""><strong>Rental Price:</strong> {`£${item.rentalPrice}`}</h5>
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