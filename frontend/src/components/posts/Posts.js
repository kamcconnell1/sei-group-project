import React from 'react'
import PostCards from '../posts/PostsCards'
import { getAllPosts, createPost } from '../../lib/api'
import { Link } from 'react-router-dom'

import { getAllPosts, createPost, deleteAPost } from '../../lib/api'
import { isOwner, isAuthenticated } from '../../lib/auth'
import { Link } from 'react-router-dom'

class Posts extends React.Component {
  state = {
    posts: null,
    input: {
      title: '',
      text: '',
      photo: ''
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
      const res = await createPost(this.state.input)
      console.log(res.data)
      this.pageSetup()
    } catch (err) {
      console.log(err)
    }
  }

  deletePost = async e => {
    console.log(e.target.value)
    await deleteAPost(e.target.value)
    await this.pageSetup()
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
                {isAuthenticated &&<form onSubmit={this.handleSubmit} >
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
                  <input
                    name="photo"
                    value={this.state.input.photo}
                    onChange={this.handleChange}
                  />
                  <button>Submit Post</button>
                </form>}
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