import React from 'react'
import {Link} from 'react-router-dom'
import { getUserProfile, postFavoriteFriend } from '../../lib/api'

class userShowProfile extends React.Component {
  state = { user: null, userItems: null, friend: '' }

  async componentDidMount() {
    try {
      const userId = this.props.match.params.id
      const res = await getUserProfile(userId)
      const userItems = res.data.createdArticles
      this.setState({ user: res.data, userItems })
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

  render() {
    if (!this.state.user) return <h1>User kidnapped, Ninja to the rescue</h1>
    const { user, userItems } = this.state
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
      </>
    )
  }
}

export default userShowProfile