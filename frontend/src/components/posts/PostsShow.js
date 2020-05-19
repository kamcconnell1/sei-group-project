import React from 'react'
import { Link } from 'react-router-dom'

import { getSinglePost } from '../../lib/api'

class PostsShow extends React.Component {
  state = {
    post: ''
  }

  async componentDidMount() {
    try {
      const postId = this.props.match.params.id
      const res = await getSinglePost(postId)
      this.setState({ post: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { post } = this.state
    if (!this.state.post) return <h1>loading</h1>
    const edited = post.createdAt.split('T')
    const date = edited[0]
    const time = edited[1].split('.')[0]
    return (
      <>
        <h1>{post.title}</h1>
        <img src={post.photo} alt={post.title} height="200" width="100" />
        <p>{post.text}</p>
        <Link to={`/page/${post.user._id}`}><p>Created by: {post.user.username}</p> </Link>
        <p>{date} {time}</p>
      </>
    )
  }
}

export default PostsShow