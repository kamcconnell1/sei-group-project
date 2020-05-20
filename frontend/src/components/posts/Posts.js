import React from 'react'
import PostCards from '../posts/PostsCards'
import { getAllPosts, createPost, deleteAPost } from '../../lib/api'
import { isOwner, isAuthenticated } from '../../lib/auth'
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
        <div className="Page-head">
          <div className="Page-title">
            <h1>Posts</h1>
          </div>
          <div className="Page-subtitle">
            <h2>Add & save locations to remember later</h2>
          </div>
        </div>
        <div className="Posts column-center">
          <form className="Post-form row-center"
            onSubmit={this.handleSubmit} >
            <input className="Post-input"
              name="title"
              value={this.state.input.title}
              placeholder="Title"
              onChange={this.handleChange}
            />
            <input className="Post-input"
              name="text"
              value={this.state.input.text}
              placeholder="Text"
              onChange={this.handleChange}
            />
            <input className="Post-input"
              name="photo"
              value={this.state.input.photo}
              placeholder="Upload an image"
              onChange={this.handleChange}
            />
            <button className="Post-btn">Submit Post</button>
          </form>
          <div className="Post-cards">
            {this.state.posts.map(post => (
              <PostCards
                deletePost={this.deletePost}
                key={post._id}
                {...post}
              />
            ))}
          </div>
        </div>
      </>
    )
  }
}
export default Posts