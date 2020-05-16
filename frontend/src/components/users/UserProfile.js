import React from 'react'

import ClothCard from '../clothes/ClothCard'
import ImageUpload from '../common/ImageUpload'
import { getUser } from '../../lib/api'
import avatar from '../assets/avatar.png'

// ! User profile, GETs data for user on mount

class UserProfile extends React.Component {
  state = {
    user: null
  }


  // ! Function to find user by Id and then GET the users details
  async componentDidMount() {
    const userId = this.props.match.params.id
    console.log(userId)
    try {
      const res = await getUser()
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  //* Function to allow user to upload a profile picture
  handleChange = event => {
    console.log('clicked');
    
    // const user = {...this.state.formData, []}
  }

  // * function to push the user to clothes add page if they want to add a new item 
  handleAddClothes = () => {
    const userId = this.props.match.params.id
    this.props.history.push(`/user/${userId}/add`)
  }

  render() {
    console.log(this.state.user)
    if (!this.state.user) return null
    const { username, createdArticles, profilePic } = this.state.user
    return (

      <>

        <section className="section">
          {/* //!Do we want to change the username so the first letter always shows capitalized?*/}
          <h1 className="title">Welcome back {username}</h1>
          <div className="container">
            <div className="columns">
              <div className="column ">
                <div className="control">
                  <img src={avatar} alt="avatar" />
                  <div className="container">
                    <ImageUpload 
                    onChange={this.handeChange}
                    />
                  </div>
                </div>
                <button className="button is fullwidth"
                  onClick={this.handleAddClothes}
                >Add Clothes Now</button>
              </div>
              <div className="columns is-multiline">
                <div className="control">
                  User Clothes Added - map function with clothes card
                {createdArticles.map(item =>
                  <ClothCard
                    {...item}
                    key={item._id}
                  />
                )}
                </div>
                <div className="control">
                  Saved Location Map - would need to pull from mapGL
            </div>
              </div>
              <div className="column">
                Incoming Notifications
          </div>
            </div>
          </div>
        </section>


      </>

    )
  }
}


export default UserProfile

