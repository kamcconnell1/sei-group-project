import React from 'react'
import { Link } from 'react-router-dom'
import UserClothCard from './UserClothCard'
import MessageCard from './MessageCard'
import EditProfilePicture from './EditProfilePicture'
import EditProfile from './EditProfile'
import { getProfile, editProfile, deleteProfile, inboxMessage, getUserProfile, replyMessage } from '../../lib/api'
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
    modalOpenEdit: false,
    commentsArray: [],
    rating: 0,
    errors: {},
    messages: null,
    replyModalOpen: false,
    replyId: '',
    text: ''
  }
  // * Function to GET the users details
  async componentDidMount() {
    try {
      await this.getUserDashboard()
      await this.getInbox()
      this.interval = setInterval(this.getInbox, 120000)
    } catch (err) {
      console.log(err)
    }
  }


  async getUserDashboard() {
    try {
      const res = await getProfile()
      this.setState({ user: res.data, commentsArray: res.data.comments, errors: '' })
      this.getLocation()
    } catch (err) {
      console.log(err)
    }
  }

  // * Function to toggle reply message box
  toggleReplyModal = e => {
    this.setState({ replyModalOpen: !this.state.contactModalOpen, replyId: e.target.value })
  }

  // * Function to handle change of reply textbox
  handleReplyChange = e => {
    const text = {...this.state.text, [e.target.name]: e.target.value}
    this.setState({text})
  }

  // * Function to reply to messages
  handleReplySubmit = async e => {
    e.preventDefault()
    const {replyId} = this.state
    try {
      const res = await replyMessage(replyId, this.state.text)
      console.log(res.data)
      console.log('sent')
    } catch (err) {
      console.log(err)
    }
    this.setState({replyModalOpen: false})
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
      console.log(err.response.data)
    }
  }
  //* Function to toggle state to show the image upload form or not
  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  toggleModalEdit = () => {
    this.setState({ modalOpenEdit: !this.state.modalOpenEdit })
  }

  handleChangeEdit = (e) => {
    const user = { ...this.state.user, [e.target.name]: e.target.value }
    this.setState({ user })
  }

  handleSubmitEdit = async e => {
    e.preventDefault()
    try {
      console.log('presub', this.state.user)
      const res = await editProfile(this.state.user)
      console.log(res.data)
      this.toggleModalEdit()
      this.getUserDashboard()
    } catch (err) {
      this.setState({ errors: 'username' })
    }
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
      const reversedCreatedArticles = createdArticles.reverse().slice(0, 6)
      return (
        <>

        <div className="My-profile">

          <div className="My-profile-top-row">

            {/* Section for avatar or profile pic need to change to allow to change the file  & so appears over the form appears over the avatar on hover */}
            <div className="Photo-delete-rating">
              <div className="profile-img image is-128x128">
                <img src={profilePic} alt="profile pic" />
                <button onClick={this.toggleModal}
                  className="button is-profile-btn"
                >Update Info</button>
                <EditProfile
                  errors={this.state.errors}
                  state={this.state.user}
                  toggleModalEdit={this.toggleModalEdit}
                  modalOpenEdit={this.state.modalOpenEdit}
                  onChangeEdit={this.handleChangeEdit}
                  onSubmitEdit={this.handleSubmitEdit}
                />
                <button onClick={() => { if (window.confirm("Are you sure?")) this.deleteUserProfile() }} className="button is-danger">Delete</button>
                {/* //! NEED TO ADD STAR RATINGS HERE  */}

                <div className="control">
                  <p>Star Rating</p>
                  <StarRating
                    onStarClick={this.onStarClick}
                    rating={this.state.rating}
                  />
                  <button onClick={() => { if (window.confirm("Are you sure?")) this.deleteUserProfile() }} className="button is-danger">Delete</button>
                </div>
              </div>
              <EditProfilePicture
                toggleModal={this.toggleModal}
                modalOpen={this.state.modalOpen}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
              />
              {/* Section for the user details - username, location & star rating. button to add clothes to profile   */}
              <button onClick={this.toggleModalEdit}
                className="button is-profile-btn"
              >Update Info</button>
              <EditProfile
                errors={this.state.errors}
                state={this.state.user}
                toggleModalEdit={this.toggleModalEdit}
                modalOpenEdit={this.state.modalOpenEdit}
                onChangeEdit={this.handleChangeEdit}
                onSubmitEdit={this.handleSubmitEdit}
              > <button>Edit</button> </EditProfile>
              <button onClick={() => { if (window.confirm("Are you sure?")) this.deleteUserProfile() }} className="button is-danger">Delete</button>
              {/* //! NEED TO ADD STAR RATINGS HERE  */}

              <div className="control">
                <p>Star Rating</p>
                <StarRating
                  onStarClick={this.onStarClick}
                  rating={this.state.rating}
                />
                <button onClick={() => { if (window.confirm("Are you sure?")) this.deleteUserProfile() }} className="button is-danger">Delete</button>
              </div>
            </div>
            <div className="Welcome">
              <h5 className="title">Welcome {username}</h5>
              <h6 className="subtitle">{location}</h6>
            </div>
          </div>
          <div className="My-profile-columns">
            <div className="Left-col">
              <h1>left column</h1>
              <h1>left column</h1>
              <h1>left column</h1>
              <h1>left column</h1>
            </div>

            <div className="Center-col">
              {/* Map over the clothes the user has uploaded - need to work on the positioning of this - need to add to allow user to edit / delete items */}
              <div className="My-items">
                <div className="My-items-title">
                  <h2>My Items</h2>
                  <hr />
                </div>

                <div>
                  {/* Ternary with text showing if no articles been created yet  */}
                  {(reversedCreatedArticles.length === 0) ?
                    <div className="">
                      <h1>Looks like you haven't uploaded anthing yet.</h1>
                      <p> Why don't you add some clothes now? <br /> Or browse the clothes that are on offer? </p>
                    </div>
                    :
                    <div className="My-items-index">
                      {reversedCreatedArticles.map(item =>
                        <UserClothCard
                          {...item}
                          key={item._id}
                        />
                      )}
                    </div>
                  }
                </div>
              </div>
            </div>

            <div className="Right-col">
              <button className="button is fullwidth"
                onClick={this.handleAddClothes}
              >Add Clothes Now</button>
              <hr />
              <div>
                <Link to={`/profile/${username}/friends`} className="button">Friends</Link>
              </div>
              <hr />
              <div>
                <Link to={`/profile/${username}/favourites`} className="button">Favourite Clothes</Link>
              </div>
              <hr />
              <div>
                <Link to={`/profile/${username}/favouriteposts`} className="button">Favourite Posts</Link>
              </div>


              {/* Notifications / chat section */}
              <div className="column is-3 is-user-chat">
                Messages
                  <div>
                  {messages.map(message =>
                    <MessageCard
                      key={message._id}
                      {...message}
                      reply={this.toggleReplyModal}
                      sendReply={this.handleReplySubmit}
                      replyModal={this.state.replyModalOpen}
                      replyChange={this.handleReplyChange}
                    />
                  )}
                </div>
              </div>
              
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
            </div>
          </div>

        </div>

      </>
    )
  }
}
export default UserProfile