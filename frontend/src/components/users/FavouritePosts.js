import React from 'react'

import { allUsersFavourites, deletePostFromFavs } from '../../lib/api'
import { Link } from 'react-router-dom'
import { toast } from '../../lib/notifications'

class FavouritePosts extends React.Component {
  state = {
    posts: []
  }

  async componentDidMount() {
    try {
      await this.getPosts()
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  getPosts = async () => {
    try {
      const res = await allUsersFavourites()
      this.setState({ posts: res.data.favPosts })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  removeFromFavs = async e => {
    try {
      await deletePostFromFavs(e.target.value)
      toast('Removed item from your favourites')
      this.getPosts()
    } catch (err) {
      toast('Couldnt remove item from your favourites')
    }
  }

  render() {
    if (!this.state.posts) return <h1>The Ninjas went to get you some Pizza</h1>
    const { posts } = this.state
    return (
      <>
        <div className="FavPosts">
          <h1 className="Title">
            Favourite Posts
           </h1>
          <div className="Fav-friends">
            <div className="fav-post-friends">
              {posts.map(post =>
                <div key={post._id} className="Fav-post-name">
                  <div className="Fav-card">
                    <Link to={`/posts/${post._id}`}>
                      <div className="Card-image">
                        <img src={post.photo} alt={post.title} loading="lazy" width="255" height="255" />
                      </div>
                      <div className="Card-content">
                        <h4 className=""><strong>{post.title}</strong></h4>
                      </div>
                    </Link>
                  </div>
                  <button className="Button" onClick={this.removeFromFavs} value={post._id}>Remove from favourites</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}



export default FavouritePosts