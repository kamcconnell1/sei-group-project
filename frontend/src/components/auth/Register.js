import React from 'react'

import RegisterForm from './RegisterForm'
import {registerUser} from '../../lib/api'
import { getPostcodeInfo } from '../../lib/ext_api'

class Register extends React.Component {
state = {
  formData: {
    username: '', 
    email: '', 
    postcode: '',
    password: '', 
    passwordConfirmation: '',
  }, 
  errors: {}
}

//handleChange event for inputting values on form 
handleChange = event => {
  const formData = {...this.state.formData, [event.target.name]: event.target.value }
  const errors = { ...this.state.errors, [event.target.name]: ''}
  this.setState({ formData, errors })
}

// ! Function to check whether postcode exists in postcode API - if it doesnt it will cause the user profile page to error so need to check now - come back to this once the register form errors are working 
getLocation = async event => {
  try {
    const postcode = this.state.formData.postcode
    console.log(postcode);
    const response = await getPostcodeInfo(postcode)
    console.log('postcode info', response)
  } catch (err) {
    const errors = {...this.state.errors, postcode: err.response.data.error}
    // console.log(err.response.data.error)
    this.setState({errors})
  }
}

// handleSubmit event for submitting the registration form
handleSubmit = async event => {
  event.preventDefault()
  this.getLocation()
  try{
<<<<<<< HEAD
    await registerUser(this.state.registerForm)
    // this.props.history.push('/login')
=======
    await registerUser(this.state.formData)
    this.props.history.push('/login')
>>>>>>> 4f2d136abb9b6097fa180d0fd1748bfc8ee87641
  } catch (err) {
    this.setState({ errors: err.response.data})
    console.log(err.response.data)
  }
}

  render() {
 
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