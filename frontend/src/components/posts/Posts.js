import React from 'react'

import PostCards from '../posts/PostsCards'
import { getAllPosts, createPost, deleteAPost } from '../../lib/api'
import { toast } from '../../lib/notifications'

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
      this.props.history.push('/notfound')
    }
  }

  //* Set up page outside of component did mount so it can be called again.
  pageSetup = async () => {
    try {
      const res = await getAllPosts()
      const postReverse = await res.data.reverse()
      this.setState({ posts: postReverse })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //* Handles changes on inputs for post
  handleChange = e => {
    const input = { ...this.state.input, [e.target.name]: e.target.value }
    this.setState({ input })
  }

  //* Submit post.
  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await createPost(this.state.input)
      this.setState({ commentsArray: res.data.comments, input: { ...this.state.input, title: '', text: '', photo: '' } })
      toast('Submitted post!')
      await this.pageSetup()
    } catch (err) {
      this.props.history.push('/notfound')
    }
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
          </div>
        </div>
        <div className="Posts row-center">
          <form className="Post-form"
            onSubmit={this.handleSubmit} >
            <label>Title</label>
            <input className="Post-input-title"
              name="title"
              value={this.state.input.title}
              placeholder="Title"
              onChange={this.handleChange}
            />
            <label>Content</label>
            <textarea className="Post-input-text"
              name="text"
              rows="15"
              value={this.state.input.text}
              placeholder="Text"
              onChange={this.handleChange}
            />
            <label>Add the Url of an Image here.</label>
            <input className="Post-input-title"
              name="photo"
              value={this.state.input.photo}
              placeholder="URL of Image"
              onChange={this.handleChange}
            />
            <button className="Post-btn">Submit Post</button>
          </form>
          <div className="Post-cards">
            {this.state.posts.map(post => (
              <PostCards
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