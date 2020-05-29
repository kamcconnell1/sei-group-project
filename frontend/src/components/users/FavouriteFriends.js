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
      <div className="Main">
        <div className="Friends">
          <div className="Page-head">
            <div className="Page-title">
              <h1>MY FRIENDS</h1>
            </div>
          </div>
          <div className="Fav-friends">
          {friends.length === 0 ? <p>Oh no, looks like you haven't added anything yet!<br /> Go back and add to your favourites now to save things for later.</p> : ''}
            {friends.map(friend =>
              <div key={friend.username} className="Fav-card">
                <Link to={`/page/${friend.username}`}>
                  <div className="Card-image">
                    <img src={friend.profilePic} loading="lazy" width="150" height="150" alt={friend.username} />
                  </div>
                  <div className="Card-content">
                    <h4 className=""><strong>{friend.username}</strong></h4>
                  </div>
                </Link>
                <button className="Button" onClick={this.removeFromFavs} value={friend._id}>Unfollow</button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default FavouriteFriends