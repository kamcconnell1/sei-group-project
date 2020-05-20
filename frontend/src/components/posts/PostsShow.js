import React from 'react'
import { Link } from 'react-router-dom'
import Comments  from '../common/Comments'

import { getSinglePost, commentOnPost, DeleteCommentOnPost, postFavoritePost } from '../../lib/api'
import { isOwner, isAuthenticated } from '../../lib/auth'

class PostsShow extends React.Component {
  state = {
    post: '',
    comments: {
      text: ''
    },
    commentsArray: [],
    item: ''
  }

  async componentDidMount() {
    try {
      await this.getPost()
    } catch (err) {
      console.log(err)
    }
  }

  getPost = async () => {
    try {
      const postId = this.props.match.params.id
      const res = await getSinglePost(postId)
      this.setState({ post: res.data, commentsArray: res.data.comments })
    } catch (err) {
      console.log(err)
    }
  }

  //* Comments on Posts
  handleCommentChange = e => {
    const comments = { ...this.state.comments, [e.target.name]: e.target.value}
    this.setState({ comments })
  }

  handleCommentSubmit = async e => {
    const postId = this.props.match.params.id
    e.preventDefault()
    try {
      console.log(this.state.comments)
      console.log(postId)
      const res = await commentOnPost(postId, this.state.comments)
      console.log(res.data)
      this.setState({ commentsArray: res.data.comments })
      this.getPost()
    } catch (err) {
      console.log(err)
    }
  }

  // * Handle Favourite submit
  handleFavouriteSubmit =  async e => {
    try {
      const addToList = await { ...this.state.item, [e.target.name]: e.target.value }
      console.log(addToList)
      const res = await postFavoritePost(addToList)
      console.log('res sent:',res)
      console.log('sent')
    } catch (err) {
      console.log(err)
    }
  }

  //* Delete Comments on Posts
  deleteComment = async e => {
    try {
      const postId = this.props.match.params.id
      const commentId = e.target.value
      await DeleteCommentOnPost(postId, commentId)
      console.log('sucess')
      this.getPost()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { post, comments, commentsArray } = this.state
    if (!this.state.post) return <h1>loading</h1>
    const edited = post.createdAt.split('T')
    const date = edited[0]
    const time = edited[1].split('.')[0]
    console.log(post._id)
    return (
      <>
        <section className="hero is-light">
          <div className="hero-body">
            <div className="container">
              <h1>{post.title}</h1>
            </div>
          </div>
          <img src={post.photo} alt={post.title} height="200" width="100" />
          <p>{post.text}</p>
          <Link to={`/page/${post.user._id}`}><p>Created by: {post.user.username}</p> </Link>
          <p>{date} {time}</p>
          <button name="item" value={post._id} onClick={this.handleFavouriteSubmit} className="button">Add to Favourites</button>
          {!isOwner && <Link to={`/posts/${post._id}/edit`}><button>Edit</button></Link>}
        </section>
        {isAuthenticated && <section>
        <form onSubmit={this.handleCommentSubmit}>
        <div>
        <div className="label for comments">
              <p> Comment on {post.title} </p>
            </div>
            <input
              className="comments-input"
              type="textArea"
              maxLength="250"
              name="text"
              onChange={this.handleCommentChange}
              value={comments.text} />
          </div>
          <div className="comments-submit-button">
            <button>Submit Comment</button>
          </div>
        </form>
        <div>
          {commentsArray.map(comment => (
            <Comments
              key={comment._id}
              comment={comment}
              deleteComment={this.deleteComment}
            />
          ))}
        </div>
      </section>}
      </>
    )
  }
}

export default PostsShow