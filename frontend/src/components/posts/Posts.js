import React from 'react'
import PostCards from '../posts/PostsCards'

import { getAllPosts, createAPost } from '../../lib/api'
import { Link } from 'react-router-dom'


class Posts extends React.Component {

  state = {
    posts: null,
    input: {
      title: '',
      text: ''
    }
  }

  async componentDidMount() {
    try {
      this.pageSetup()
    } catch (err) {
      console.log(err)
    }
  }

  pageSetup = async () => {
    try {
      const res = await getAllPosts()
      console.log(res.data)
      this.setState({ posts: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = e => {
    const input = { ...this.state.input, [e.target.name]: e.target.value }
    this.setState({ input })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await createAPost(this.state.input)
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  deletePost = e => {
    console.log(e.target.value)

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
                <form onSubmit={this.handleSubmit} >
                  <input
                    name="title"
                    value={this.state.input.title}
                    place="Title"
                    onChange={this.handleChange}
                  />
                  <input
                    name="text"
                    value={this.state.input.text}
                    onChange={this.handleChange}
                  />
                  <button>Submit Post</button>
                </form>
                <div>
                  {this.state.posts.map(post => (
                    <PostCards
                      deletePost={this.deletePost}
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