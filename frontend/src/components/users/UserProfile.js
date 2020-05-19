import React from 'react'

import UserClothCard from './UserClothCard'
import EditProfile from './EditProfile'

import { getProfile, editProfile } from '../../lib/api'
import { getPostcodeInfo} from '../../lib/ext_api'
import avatar from '../assets/avatar.png'

// import Map from '../common/Map'

// ! User profile, GETs data for user on mount

class UserProfile extends React.Component {
  state = {
    user: '',
    location: '',
    latitude: '', 
    longitude: '',
    clickAvatar: false
  }


  // * Function to GET the users details
  async componentDidMount() {
    try {
      const res = await getProfile()
      this.setState({ user: res.data })
      this.getLocation()
    } catch (err) {
      console.log(err)
    }
  }

  //* Function to find user location details
  async getLocation() {
    const postcode = this.state.user.postcode
    const response = await getPostcodeInfo(postcode)
  
    const nuts = response.data.result.nuts
    const region = response.data.result.region
    const latitude = response.data.result.latitude
    const longitude = response.data.result.longitude

    this.setState({ location: `${nuts}, ${region}`, latitude, longitude })
  }

  //* Function to allow user to upload a profile picture
  handleChange = event => {
    const user = { ...this.state.user, profilePic: event.target.value }
    this.setState({ user }, this.handleSubmit)
  }

 async handleSubmit() {
    try {
      console.log(this.state.user);
      
      const res = await editProfile(this.state.user)
      console.log('submit event res', res)
    } catch (err) {
      console.log(err.response.data);
    }
  } 

  // * Function to push the user to clothes add page if they want to add a new item 
  handleAddClothes = () => {
    const user = this.props.match.params.username
    console.log(user);

    this.props.history.push(`/profile/${user}/add`)
  }

  //* Function to toggle state to show the image upload form or not
  toggleModal = () => {
    this.setState({ clickAvatar: !this.state.clickAvatar })
  }

  render() {
    if (!this.state.user || !this.state.location) return null

    // consts taken from state to populate user data shown on the page
    const { username, createdArticles, profilePic } = this.state.user
    const location = this.state.location

    console.log(this.state)
    return (

      <>

        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-3 is-profile-info">
                
                  {/* Section for avatar or profile pic need to change to allow to change the file  & so appears over the form appears over the avatar on hover */}

                <div className="profile-img">
                  { profilePic ?
                  <img src={profilePic} alt="profile pic" />
                :
                <img src={avatar} alt="avatar" />

                }
                <button onClick={this.toggleModal}
                className="button is-profile-btn"
                >Change Profile Picture</button>
                </div>
                <EditProfile 
                onClick={this.toggleModal}
                modalStatus={this.state.clickAvatar}
                onChange={this.handleChange}
                
                />
            
            <button className="button is fullwidth"
                  onClick={this.toggleModal}
                >Edit Profile</button>

                {/* Section for the user details - username, location & star rating. button to add clothes to profile   */}
                <div className="control">
                  <h5 className="title">Welcome {username}</h5>
                  <h6 className="subtitle">{location}</h6>
                  {/* //! NEED TO ADD STAR RATINGS HERE  */}
                  <p>Star Rating</p>
                  <hr />
                </div>
                <button className="button is fullwidth"
                  onClick={this.handleAddClothes}
                >Add Clothes Now</button>
              </div>

              {/* Map over the clothes the user has uploaded - need to work on the positioning of this - need to add to allow user to edit / delete items */}
              <div className="column is-multiline is-user-clothes">
                <div className="control">
                  {createdArticles.map(item =>
                    <UserClothCard
                      {...item}
                      key={item._id}
                      name={profilePic}
                    />
                  )}
                </div>
              </div>
              {/* Notifications / chat section */}
              <div className="column is-3 is-user-chat">
                Incoming Notifications
          </div>
            </div>
          </div>

          {/* Map section - which will show pins user has added - need to link to items of clothing / shops somehow  */}
          {/* <div className="control">
            Map to allow users to save locations - linked from searches on clothes show page maybe */}
                  {/* <Map
              latitude={this.state.latitude}
              longitude={this.state.longitude} /> */}
          {/* </div> */}

        </section>


      </>

    )
  }
}


export default UserProfile

