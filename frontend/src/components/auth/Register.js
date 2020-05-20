import React from 'react'

import RegisterForm from './RegisterForm'
import { registerUser } from '../../lib/api'
import { getPostcodeInfo } from '../../lib/ext_api'
import { avatarArr } from '../common/Images'

class Register extends React.Component {
  state = {
    formData: {
      username: '',
      profilePic: '',
      email: '',
      postcode: '',
      password: '',
      passwordConfirmation: '',
    },
    errors: {}
  }

  //handleChange event for inputting values on form 
  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

  handlePostcodeChange = event => {
    const formData = { ...this.state.formData, postcode: event.target.value }
    const errors = { ...this.state.errors, postcode: '' }

    this.setState({ formData, errors }, () => {
      this.getLocation()
      this.assignAvatar()
    })
  }

  // Function to check whether postcode exists in postcode API 
  getLocation = async event => {
    try {
      const postcode = this.state.formData.postcode
      const response = await getPostcodeInfo(postcode)
      console.log('postcode info', response)
    } catch (err) {
      const errors = { ...this.state.errors, postcode: err.response.data.error }
      // console.log(err.response.data.error)
      this.setState({ errors })
    }
  }

  // Randomly assign the user an avatar profile picture 
  assignAvatar = () => {
    const avatar = avatarArr[Math.floor(Math.random() * avatarArr.length)]
    console.log(avatar);
    const formData = { ...this.state.formData, profilePic: avatar }
    this.setState({ formData })
  }

  // handleSubmit event for submitting the registration form
  handleSubmit = async event => {
    event.preventDefault()
    // this.getLocation()
    try {

      await registerUser(this.state.formData)
      this.props.history.push('/login')
      console.log('registered');

    } catch (err) {
      this.setState({ errors: err.response.data })
      console.log(err.response.data)
    }
  }

  render() {
    console.log(this.state.errors);

    return (
      <>
        <section className="section">
          <div className="container">
            <h1 className="title">KEBB Clothes</h1>
            <h2 className="subtitle">
              Join here
              </h2>
          </div>
        </section>
        <RegisterForm
          handlePostcodeChange={this.handlePostcodeChange}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
          {...this.state.formData}
        />
      </>
    )
  }
}

export default Register