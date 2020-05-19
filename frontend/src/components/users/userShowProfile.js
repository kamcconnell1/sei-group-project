import React from 'react'
import { Link } from 'react-router-dom'
import { getUserProfile, postFavoriteFriend, commentOnUser, DeleteCommentOnUser } from '../../lib/api'
import Comments from '../common/Comments'
import { isAuthenticated } from '../../lib/auth'

class userShowProfile extends React.Component {
  state = {
    user: null,
    userItems: null,
    friend: '',
    comments: {
      text: ''
    },
    commentsArray: []
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
      const userId = this.props.match.params.id
      const res = await getUserProfile(userId)
      const userItems = res.data.createdArticles
      this.setState({ user: res.data, userItems, commentsArray: res.data.comments })
    } catch (err) {
      console.log(err)
    }
  }

  // * Function to add poster to friends
  handleFriendSubmit = async e => {
    try {
      const addToList = await { ...this.state.friend, [e.target.name]: e.target.value }
      console.log(addToList)
      const res = await postFavoriteFriend(addToList)
      console.log('posted data:', res)
      console.log('clicked')
    } catch (err) {
      console.log(err)
    }
  }

  //* Handle Comments on User
  handleCommentChange = e => {
    const comments = { ...this.state.comments, [e.target.name]: e.target.value}
    this.setState({ comments })
  }

  //* Submit Comment on User
  handleCommentSubmit = async e => {
    const userId = this.props.match.params.id
    e.preventDefault()
    try {
      const res = await commentOnUser(userId, this.state.comments)
      console.log(res.data)
      this.setState({ commentsArray: res.data.comments })
      this.getUser()
    } catch (err) {
      console.log(err)
    }
  }

  //* Delete Comments on User
  deleteComment = async e => {
    try {
      const userId = this.props.match.params.id
      const commentId = e.target.value
      await DeleteCommentOnUser(userId, commentId)
      console.log('sucess')
      this.getUser()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.user) return <h1>User kidnapped, Ninja to the rescue</h1>
    const { user, userItems, comments, commentsArray } = this.state
    console.log(userItems)
    return (
      <>
        <section>
          <div className="container">
            <figure className="media-right">
              <p className="image is-64x64">
                <img src={user.profilePic} alt={user.username} />
              </p>
            </figure>
          </div>
          <div>
            <h4 className="title is-3">{user.username}</h4>
          </div>
          <div>
            <h4 className="title is-5">Ratings go here</h4>
          </div>
          <button name="friend" value={user._id} onClick={this.handleFriendSubmit} className="button is-primary">Add Friend</button>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns is-multiline">
              {userItems.map(item =>
                <div key={item._id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
                  <Link to={`/clothes/${item._id}`}>
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-header-title">{item.title}</h4>
                      </div>
                      <div className="card-image">
                        <figure className="image image is-1by1">
                          <img src={item.image} alt={item.title} loading="lazy" width="255" height="255" />
                        </figure>
                      </div>
                      <div className="card-content">
                        <h5 className=""><strong>Rental Price:</strong> {`£${item.rentalPrice}`}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
        {isAuthenticated && <section>
          <form onSubmit={this.handleCommentSubmit}>
            <div>
              <div className="label for comments">
                <p> Comment on {user.username} </p>
              </div>
              <input
                className="comments-input"
                type="textArea"
                maxLength="250"
                name="text"
                onChange={this.handleCommentChange}
                value={comments.text} />
            </div>
            <div className="comments-submit-button">
              <button>Submit Comment</button>
            </div>
          </form>
          <div>
            {commentsArray.map(comment => (
              <Comments
                key={comment._id}
                comment={comment}
                deleteComment={this.deleteComment}
              />
            ))} 
          </div>
        </section>}
      </>
    )
  }
}

export default userShowProfile