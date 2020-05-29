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
    console.log(posts);
    
    return (
      <div className="Main">
        <div className="Fav-Posts">
          <div className="Page-head">
            <div className="Page-title">
              <h1>MY FAVOURITE ITEMS</h1>
            </div>
          </div>
          <div className="Fav-posts">
            <div className="fav-post-friends">
              {posts.length === 0 ? <p>Oh no, looks like you haven't added anything yet!<br /> Go back and add to your favourites now to save things for later.</p> : ''}
              {posts.map(post =>
                <div key={post._id} className="Fav-post-card">
                  <Link to={`/posts/${post._id}`} className="Post-img-text">
                    <div className="Card-image">
                      <img src={post.photo} alt={post.title} loading="lazy" width="255" height="255" />
                    </div>
                    <div className="Card-content">
                      <h4 className="">{post.title}</h4>
                      <button className="Button" onClick={this.removeFromFavs} value={post._id}>Remove from favourites</button>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default FavouritePosts