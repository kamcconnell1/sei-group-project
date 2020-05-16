import React from 'react'

import ClothCard from '../clothes/ClothCard'
import ImageUpload from '../common/ImageUpload'
import { getProfile } from '../../lib/api'
import { getPostcodeInfo } from '../../lib/ext_api'
import avatar from '../assets/avatar.png'

import Map from '../common/Map'

// ! User profile, GETs data for user on mount

class UserProfile extends React.Component {
  state = {
    user: null,
    location: '', 
    hoverAvatar: false
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
  async getLocation () {
    const postcode = this.state.user.postcode
    const response = await getPostcodeInfo(postcode)
    const nuts = response.data.result.nuts
    const region = response.data.result.region
      
    this.setState({location: `${nuts}, ${region}`})
  }

  //* Function to allow user to upload a profile picture
  handleChange = event => {
    const user = { ...this.state.user, profilePic: event.target.value }
    this.setState({ user })
  }

  // * Function to push the user to clothes add page if they want to add a new item 
  handleAddClothes = () => {
    const user = this.props.match.params.username
    this.props.history.push(`/profile/${user}/add`)
  }

  //* Function to toggle state to show the image upload form or not
  toggleHover= () => {
    this.setState({ hoverAvatar: !this.state.hoverAvatar })
  }
  
  render() {
    if (!this.state.user || !this.state.location) return null

    // consts taken from state to populate user data shown on the page
    const { username, createdArticles, profilePic} = this.state.user
    const location = this.state.location
  
    
    return (

      <>

        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-3">



                <div className="control" 
                onMouseEnter={this.toggleHover} 
                onMouseLeave={this.toggleHover}
                >
                  {(profilePic.length> 0) ?
                    <div>
                      <img src={profilePic} alt="profile pic" />
                    </div>
                    :
                    <div>
                      <img src={avatar} alt="avatar" />
                {/* //! Want to change this to a button - says add profile picture and then the upload form pops up rather then always on show */}
                {this.state.hoverAvatar? 
                      <ImageUpload
                        onChange={this.handleChange}
                        name="profilePic"
                        labelText="Upload Profile Picture"
                      />
                   : '' }
                    </div>
                  }
                </div>

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
              <div className="column is-multiline">
                <div className="control">
                {createdArticles.map(item =>
                  <ClothCard
                    {...item}
                    key={item._id}
                    name={profilePic}
                  />
                )}
                </div>
              </div>
              <div className="column">
                Incoming Notifications
          </div>
            </div>
          </div>
                <div className="control">
                  <Map 
                  {...this.state.user}/>
            </div>

        </section>


      </>

    )
  }
}


export default UserProfile

