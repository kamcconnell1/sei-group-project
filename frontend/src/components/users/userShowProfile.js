import React from 'react'
import { getUserProfile } from '../../lib/api'

class userShowProfile extends React.Component {
  state = { user: null }

  async componentDidMount() {
    try {
      const userId = this.props.match.params.id
      console.log(userId)
      const res = await getUserProfile(userId)
      // console.log(res)
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    if (!this.state.user) return <h1>User kidnapped, Ninja to the rescue</h1>
    const { user } = this.state
    console.log(user)
    return (
      <>
        <section>
          <div className="container">
            <figure className="media-right">
              <p className="image is-64x64">
                <img src={user.profilePic} alt={user.username} />
              </p>
            </figure>
          </div>
          <div>
            <h4 className="title is-3">{user.username}</h4>
          </div>
          <div>
            <h4 className="title is-5">Ratings go here</h4>
          </div>
        </section>
          <section className="section">
            <div className="container">
              <h1 className="title">Section</h1>
              <h2 className="subtitle">
                A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
              </h2>
            </div>
          </section>
      </>
    )
  }
}

export default userShowProfile