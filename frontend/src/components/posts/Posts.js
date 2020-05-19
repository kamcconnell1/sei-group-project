import React from 'react'
import PostCards from '../posts/PostsCards'

import { getAllPosts } from '../../lib/api'


class Posts extends React.Component {

  state = {
    posts: null,
  }

  async componentDidMount() {
    try {
      const res = await getAllPosts()
      console.log(res.data)
      this.setState({ posts: res.data })
    } catch (err) {
      console.log(err)
    }
  }


  render() {
    if (!this.state.posts) return null
    return (
      <>
        <section className="hero is-light">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-multiline">
                <h1>Posts</h1>
                <div>
                  {this.state.posts.map(post => (
                    <PostCards
                      key={post._id}
                      {...post}
                    />
                  ))}
                </div>
              </div>
              </div>
            </div>
        </section>
      </>
    )
  }
}

export default Posts