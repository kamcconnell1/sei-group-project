import React from 'react'
import PostCards from '../posts/PostsCards'

import { getAllPosts } from '../../lib/api'


class Posts extends React.Component {

  state = {
    posts: null,
  }

async componentDidMount () {
  try {
    const res = await getAllPosts()
    console.log(res.data)
    this.setState({ posts: res.data})
  } catch (err) {
    console.log(err)
  }
}


render() {
  if (!this.state.tracks) return null
  return (
    <>
    <h1>s</h1>
    <div>
    {this.state.posts.map(post => (
      <PostCards
      key={post._id}
      {...this.state.posts}
      />
    ))}
    </div>
    </>
  )
}
}

export default Posts