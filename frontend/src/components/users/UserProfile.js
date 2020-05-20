import React from 'react'
import { Link } from 'react-router-dom'
import UserClothCard from './UserClothCard'
import EditProfile from './EditProfile'
import { getProfile, editProfile, deleteProfile, inboxMessage } from '../../lib/api'
import { logout } from '../../lib/auth'
import { getPostcodeInfo } from '../../lib/ext_api'
import Comments from '../common/Comments'
import StarRating from '../common/StarRating'
// ! User profile, GETs data for user on mount
class UserProfile extends React.Component {
  state = {
    user: '',
    location: '',
    latitude: '',
    longitude: '',
    modalOpen: false,
    commentsArray: [],
    rating: 0,
    messages: null
  }
  // * Function to GET the users details
  async componentDidMount() {
    try {
      await this.getUserDashboard()
      await this.getInbox()
    } catch (err) {
      console.log(err)
    }
  }
  async getUserDashboard() {
    try {
      const res = await getProfile()
      this.setState({ user: res.data, commentsArray: res.data.comments })
      this.getLocation()
    } catch (err) {
      console.log(err)
    }
  }

  // * Function to GET incoming messages
  async getInbox() {
    try {
      const res = await inboxMessage()
      this.setState({ messages: res.data })
    } catch (err) {
      console.log(err)
    }
  }



  //* Function to find user location details
  async getLocation() {
    try {
      const postcode = this.state.user.postcode
      const response = await getPostcodeInfo(postcode)
      const nuts = response.data.result.nuts
      const region = response.data.result.region
      const latitude = response.data.result.latitude
      const longitude = response.data.result.longitude
      this.setState({ location: `${nuts}, ${region}`, latitude, longitude })
    } catch (err) {
      const latitude = 51.515419
      const longitude = -0.141099
      this.setState({ location: 'London, UK', latitude, longitude })
    }
  }
  //* Function to allow user to upload a profile picture
  handleChange = (event) => {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        profilePic: event.target.value
      }
    }))
  }
  //* Function for PUT request to update profile picture
  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await editProfile(this.state.user)
      this.toggleModal()
      this.getUserDashboard()
      console.log('submit event res', res)
    } catch (err) {
      console.log(err.response.data);
    }
  }
  //* Function to toggle state to show the image upload form or not
  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  //* Delete Profile
  deleteUserProfile = async e => {
    try {
      await deleteProfile()
      await logout()
      this.props.history.push(`/`)
    } catch (err) {
      console.log(err)
    }
  }
  // * Function to push the user to clothes add page if they want to add a new item 
  handleAddClothes = () => {
    const user = this.props.match.params.username
    this.props.history.push(`/profile/${user}/add`)
  }
  // * Star Rating Function
  onStarClick = () => {
    console.log('clicked')
  }

  render() {
    if (!this.state.user || !this.state.location || !this.state.messages) return null
    // consts taken from state to populate user data shown on the page
    const { username, createdArticles, profilePic } = this.state.user
    const { commentsArray, messages } = this.state
    const location = this.state.location
    console.log(messages)


    return (
      <>
        <div className="Page-head">
          <div className="Page-title">
            <h1>My Profile</h1>
          </div>
          {/* <div className="Page-subtitle">
            <h2>USERNAME?</h2>
          </div> */}
        </div>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-3 is-profile-info">
                {/* Section for avatar or profile pic need to change to allow to change the file  & so appears over the form appears over the avatar on hover */}
                <div className="profile-img image is-128x128">
                  <img src={profilePic} alt="profile pic" />
                  <button onClick={this.toggleModal}
                    className="button is-profile-btn"
                  >Change Profile Picture</button>
                </div>
                <EditProfile
                  toggleModal={this.toggleModal}
                  modalOpen={this.state.modalOpen}
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                />
                {/* Section for the user details - username, location & star rating. button to add clothes to profile   */}
                <div className="control">
                  <h5 className="title">Welcome {username}</h5>
                  <h6 className="subtitle">{location}</h6>
                  <button onClick={() => { if (window.confirm("Are you sure?")) this.deleteUserProfile() }} className="button is-danger">Delete</button>
                  {/* //! NEED TO ADD STAR RATINGS HERE  */}
                  <p>Star Rating</p>
                  <StarRating
                    onStarClick={this.onStarClick}
                    rating={this.state.rating}
                  />
                  <hr />
                </div>
                <button className="button is fullwidth"
                  onClick={this.handleAddClothes}
                >Add Clothes Now</button>
                <hr />
                <div>
                  <Link to={`/profile/${username}/friends`} className="button">Friends</Link>
                </div>
                <hr />
                <div>
                  <Link to={`/profile/${username}/favourites`} className="button">Favourite</Link>
                </div>
              </div>
              {/* Map over the clothes the user has uploaded - need to work on the positioning of this - need to add to allow user to edit / delete items */}
              <div className="column is-multiline is-user-clothes">
                <div className="users-articles has-text-centered">
                  <hr />
                  <h2>YOUR ITMES</h2>
                  <hr />
                  {/* Ternary with text showing if no articles been created yet  */}
                  {(createdArticles.length === 0) ?
                    <div className="container">
                      <h1>Looks like you haven't uploaded anthing yet.</h1>
                      <p> Why don't you add some clothes now? <br /> Or browse the clothes that are on offer? </p>
                    </div>
                    :
                    <div className="control">
                      {createdArticles.map(item =>
                        <UserClothCard
                          {...item}
                          key={item._id}
                        />
                      )}
                    </div>
                  }
                </div>
              </div>
              {/* Notifications / chat section */}
              <div className="column is-3 is-user-chat">
                Messages
                <div>
                  {messages.map(message => 
                    <div key={message._id}>
                      <p>{message.text}</p>
                    </div>
                    )}
                </div>
          </div>
            </div>
          </div>
        </section>
        <section>
          <div>
            {commentsArray.map(comment => (
              <Comments
                key={comment._id}
                comment={comment}
              />
            ))}
          </div>
        </section>
      </>
    )
  }
}
export default UserProfile