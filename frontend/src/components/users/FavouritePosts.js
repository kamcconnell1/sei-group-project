import React from 'react'
import { allUsersFavourites, deletePostFromFavs } from '../../lib/api'
import { Link } from 'react-router-dom'

class FavouritePosts extends React.Component {
  state = { 
    posts: []
  }

  async componentDidMount() {
    try{
    await this.getPosts()
    } catch (err) {
      console.log(err)
    }
  }

  getPosts = async () => {
    try{
    const res = await allUsersFavourites()
    this.setState({ posts: res.data.favPosts })
    } catch (err) {
      console.log(err)
    }
  }

  removeFromFavs = async e => {
    try{
    console.log(e.target.value)
    await deletePostFromFavs(e.target.value)
    this.getPosts()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.posts) return <h1>The Ninjas went to get you some Pizza</h1>
    const { posts } = this.state
    return (
      <>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Favourite Posts
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns is-multiline">
              {posts.map(post =>
                <div key={post._id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
                
                  <div className="card">
                  <Link to={`/posts/${post._id}`}>
                    <div className="card-header">
                    </div>
                    <div className="card-image">
                      <figure className="image image is-1by1">
                        <img src={post.image} alt={post.title} loading="lazy" width="255" height="255" />
                      </figure>
                    </div>
                    <div className="card-content">
                      <h4 className=""><strong>{post.title}</strong></h4>
                      <h5 className=""><strong></strong></h5>
                    </div>
                    </Link>
                    <button onClick={this.removeFromFavs} value={post._id}>Remove from favourites</button>
                  </div>
              
              </div> 
              )}
            </div>
          </div>
        </section>
      </>
    )
  }
}



export default FavouritePosts