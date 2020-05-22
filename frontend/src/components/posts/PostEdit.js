import React from 'react'

import { editPost, getSinglePost } from '../../lib/api'

class PostEdit extends React.Component {
  state = {
    dataInput: {
      title: '',
      text: '',
      photo: ''
    }
  }

  async componentDidMount() {
    const id = this.props.match.params.id
    try {
      const res = await getSinglePost(id)
      this.setState({ dataInput: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleChange = e => {
    const dataInput = { ...this.state.dataInput, [e.target.name]: e.target.value }
    this.setState({ dataInput })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const id = this.state.dataInput._id
      const res = await editPost(id, this.state.dataInput)
      this.props.history.push(`/posts/${res.data._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-multiline">
              <h1>Posts</h1>
              <form onSubmit={this.handleSubmit} >
                <input
                  name="title"
                  value={this.state.dataInput.title}
                  place="Title"
                  onChange={this.handleChange}
                />
                <input
                  name="text"
                  value={this.state.dataInput.text}
                  onChange={this.handleChange}
                />
                <input
                  name="photo"
                  value={this.state.dataInput.photo}
                  onChange={this.handleChange}
                />
                <button>Submit Post</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default PostEdit