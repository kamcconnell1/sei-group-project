import React from 'react'
import PostCards from '../posts/PostsCards'
import ImageUpload from '../common/ImageUpload'
import { uploadClothesImage } from '../../lib/ext_api'
import { getAllPosts, createPost, deleteAPost } from '../../lib/api'

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
      await this.pageSetup()
    } catch (err) {
      console.log(err)
    }
  }
  deletePost = async e => {
    await deleteAPost(e.target.value)
    await this.pageSetup()
  }

  render() {
    if (!this.state.posts) return null

    const reversedPosts = this.state.posts.reverse()

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
            <label>Upload an image</label>
            <ImageUpload
            onChange={this.handleChange}
            preset={uploadClothesImage}
            name="photo"
            />
            <button className="Post-btn">Submit Post</button>
          </form>
          <div className="Post-cards">
            {reversedPosts.map(post => (
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