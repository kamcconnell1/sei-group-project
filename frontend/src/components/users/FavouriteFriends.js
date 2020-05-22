import React from 'react'
import { Link } from 'react-router-dom'

import { allUsersFavourites, deleteFriend } from '../../lib/api'
import { toast } from '../../lib/notifications'

class FavouriteFriends extends React.Component {
  state = {
    friends: null
  }

  async componentDidMount() {
    try {
      await this.getPosts()
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //* Function 
  getPosts = async () => {
    try {
      const res = await allUsersFavourites()
      this.setState({ friends: res.data.favUsers })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //* Remove friends from favs
  removeFromFavs = async e => {
    try {
      await deleteFriend(e.target.value)
      toast('You removed a friend!')
      this.getPosts()
    } catch (err) {
      toast('Couldnt remove friend')
    }
  }

  render() {
    if (!this.state.friends) return <h1>Looks like the Ninjas dont like you</h1>
    const { friends } = this.state
    return (
      <>
        <div className="Friends">
          <h1 className="Title">
            Following
          </h1>
          <div className="Fav-friends">
            <div className="fav-card-friends">
              {friends.map(friend =>
                <div key={friend.username} className="Friends-name">
                  <div className="Fav-card">
                    <Link to={`/page/${friend.username}`}>
                      <div className="Card-image">
                        <img src={friend.profilePic} loading="lazy" width="150" height="150" alt={friend.username} />
                      </div>
                      <div className="Card-content">
                        <h4 className=""><strong>{friend.username}</strong></h4>
                      </div>
                    </Link>
                  </div>
                  <button className="Button" onClick={this.removeFromFavs} value={friend._id}>Unfollow</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default FavouriteFriends