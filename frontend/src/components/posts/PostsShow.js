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

  //* delete Post
  deletePost = async e => {
    try {
      toast('Post deleted')
      await deleteAPost(e.target.value)
      this.props.history.push('/posts')
    } catch (err) {
      toast('Post couldnt be deleted')
    }
  }

  handleCommentSubmit = async e => {
    const postId = this.props.match.params.id
    e.preventDefault()
    try {
      const res = await commentOnPost(postId, this.state.comments)
      toast('Comment added')
      this.setState({ commentsArray: res.data.comments, comments: { ...this.state.comments, text: '' } })
      this.getPost()
    } catch (err) {
      toast('Couldnt add comment')
    }
  }

  // * Handle Favourite submit
  handleFavouriteSubmit = async e => {
    try {
      const addToList = await { ...this.state.posts, [e.target.name]: e.target.value }
      await postFavoritePost(addToList)
      toast('Post added to your favourite posts!')
    } catch (err) {
      toast(err.response.data.message)
    }
  }

  //* Delete Comments on Posts
  deleteComment = async e => {
    try {
      const postId = this.props.match.params.id
      const commentId = e.target.value
      await DeleteCommentOnPost(postId, commentId)
      toast('Comment deleted!')
      this.getPost()
    } catch (err) {
      toast('Couldnt delete this comment')
    }
  }

  render() {
    if (!this.state.post) return <h1>loading</h1>
    const { post, commentsArray } = this.state
    const edited = post.createdAt.split('T')
    const date = edited[0]
    const time = edited[1].split('.')[0]
    
    return (
      <>
      <div className="Page-head PostShow">
          <div className="Page-title">
                <h1 >{post.title}</h1>
              </div>
            </div>

            <div className='post-card'>
            <div className="Post-and-comments">
            <div className='card-content'>
                <img className="Post-image" src={post.photo} alt={post.title} />
                <div className="Post-right">
                <p className="Title Post">
                <Link to={`/page/${post.user.username}`}><p>Posted by {post.user.username} @ {date}</p> </Link></p>
                  <p className='Text'>{post.text}</p>
              <div className="Created-by">
                {isOwner(post.user._id) && <Link to={`/posts/${post._id}/edit`}><button className="Button">Edit</button></Link>}
                {isOwner(post.user._id) && <button className="Button" value={post._id} onClick={this.deletePost}>Delete</button>}
                {isAuthenticated() && <button name="posts" value={post._id} onClick={this.handleFavouriteSubmit} className="favourite-btn">❤️ Love!</button>}
              </div>
              </div>
              </div>
            </div>
            <div className="Comments-all">
                  <div className="Post-comment">
              {isAuthenticated() && 
                <form onSubmit={this.handleCommentSubmit}>
                    <div className="label for comments">
                      <p> Leave a comment </p>
                    </div>
                    <input
                      className="comments-input"
                      placeholder='Comment'
                      maxLength="250"
                      name="text"
                      onChange={this.handleCommentChange}
                      value={this.state.comments.text} />
                      <div >
                    <button className="Button">Submit</button>
                    </div>
              </form> }
                  </div>
                  <div className="User-comments">
                {commentsArray.length > 0 
                ? 
                  commentsArray.map(comment => (
                    <Comments
                      key={comment._id}
                      comment={comment}
                      deleteComment={this.deleteComment}
                    />
                  ))
                  :
                  ''
                }
                </div>
            </div>
            </div>
          </>
    )
  }
}

export default PostsShow