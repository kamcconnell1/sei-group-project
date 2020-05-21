import React from 'react'
import { Link } from 'react-router-dom'
import Comments from '../common/Comments'

import { getSinglePost, commentOnPost, DeleteCommentOnPost, deleteAPost, postFavoritePost } from '../../lib/api'
import { isOwner, isAuthenticated } from '../../lib/auth'
import { toast } from '../../lib/notifications'

class PostsShow extends React.Component {
  state = {
    post: '',
    comments: {
      text: ''
    },
    commentsArray: [],
    posts: ''
  }

  async componentDidMount() {
    try {
      await this.getPost()
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  getPost = async () => {
    try {
      const postId = this.props.match.params.id
      const res = await getSinglePost(postId)
      this.setState({ post: res.data, commentsArray: res.data.comments })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //* Comments on Posts
  handleCommentChange = e => {
    const comments = { ...this.state.comments, [e.target.name]: e.target.value }
    this.setState({ comments })
  }

  deletePost = async e => {
    try {
      toast('Post deleted')
      await deleteAPost(e.target.value)
      this.props.history.push('/posts')
    } catch (err) {
      toast('Post could not be deleted')
    }
  }

  handleCommentSubmit = async e => {
    const postId = this.props.match.params.id
    e.preventDefault()
    try {
      console.log(this.state.comments)
      console.log(postId)
      const res = await commentOnPost(postId, this.state.comments)
      console.log(res.data)
      this.setState({ commentsArray: res.data.comments, comments: { ...this.state.comments, text: '' } })
      this.getPost()
    } catch (err) {
      console.log(err)
    }
  }

  // * Handle Favourite submit
  handleFavouriteSubmit = async e => {
    try {
      const addToList = await { ...this.state.posts, [e.target.name]: e.target.value }
      console.log('Post Id:', addToList)
      const res = await postFavoritePost(addToList)
      console.log('res sent:', res.data)
      console.log('sent')
    } catch (err) {
      // console.log(err)
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
    const { post, commentsArray } = this.state
    if (!this.state.post) return <h1>loading</h1>
    const edited = post.createdAt.split('T')
    const date = edited[0]
    const time = edited[1].split('.')[0]
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
          <Link to={`/page/${post.user.username}`}><p>Created by: {post.user.username}</p> </Link>
          <p>{date} {time}</p>
<<<<<<< HEAD
          <br />
          <div>
          <button name="posts" value={post._id} onClick={this.handleFavouriteSubmit} className="button is-small is-danger">Add to Favourites</button>
          {!isOwner && <Link to={`/posts/${post._id}/edit`}><button>Edit</button></Link>}
          </div>
        </section>
        {isAuthenticated && <section>
        <form onSubmit={this.handleCommentSubmit}>
        <div>
        <div className="label for comments">
              <p> Add a comment </p>
            </div>
            <textarea
              className="textarea is-small is-info"
              type="textArea"
              maxLength="250"
              name="text"
              onChange={this.handleCommentChange}
              value={this.state.comments.text}></textarea>
          </div>
          <br/>
          <div className="comments-submit-button">
            <button className="button is-info is-small">Submit Comment</button>
=======
          <button name="posts" value={post._id} onClick={this.handleFavouriteSubmit} className="button">Add to Favourites</button>
          {isOwner && <Link to={`/posts/${post._id}/edit`}><button>Edit</button></Link>}
          {isOwner && <button value={post._id} onClick={this.deletePost}>Delete</button>}
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
                value={this.state.comments.text} />
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
>>>>>>> development
          </div>
        </section>}
      </>
    )
  }
}

export default PostsShow