import React from 'react'
import { Link } from 'react-router-dom'

import { allUsersFavourites, deleteFriend } from '../../lib/api'

class FavouriteFriends extends React.Component {
  state = { friends: null }

  async componentDidMount() {
    try {
      await this.getPosts()
    } catch (err) {
      console.log(err)
    }
  }

  getPosts = async () => {
    try {
      const res = await allUsersFavourites()
      this.setState({ friends: res.data.favUsers })
    } catch (err) {
      console.log(err)
    }
  }

  removeFromFavs = async e => {
    try {
      console.log(e.target.value)
      await deleteFriend(e.target.value)
      this.getPosts()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.friends) return <h1>Looks like the Ninjas dont like you</h1>
    const { friends } = this.state
    console.log(friends)
    return (
      <>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Friends
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns is-multiline">
              {friends.map(friend =>
                <div key={friend.username} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
                  <div className="card">
                    <Link to={`/page/${friend.username}`}>
                      <div className="card-header">
                      </div>
                      <div className="card-image">
                        <figure className="image image is-1by1">
                          <img src={friend.profilePic} loading="lazy" width="150" height="150" alt={friend.username} />
                        </figure>
                      </div>
                      <div className="card-content">
                        <h4 className=""><strong>{friend.username}</strong></h4>
                      </div>
                    </Link>
                  </div>
                  <button onClick={this.removeFromFavs} value={friend._id}>Remove from favourites</button>
                </div>
              )}
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default FavouriteFriends