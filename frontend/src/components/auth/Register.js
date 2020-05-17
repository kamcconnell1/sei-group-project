import React from 'react'

import RegisterForm from './RegisterForm'
import {registerUser} from '../../lib/api'
import { getPostcodeInfo } from '../../lib/ext_api'

class Register extends React.Component {
state = {
  registerForm: {
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
  // console.log(event.target.value);
  const registerForm = {...this.state.registerForm, [event.target.name]: event.target.value }
  const errors = { ...this.state.errors, [event.target.name]: ''}
  this.setState({ registerForm, errors })
}

// ! Function to check whether postcode exists in postcode API - if it doesnt it will cause the user profile page to error so need to check now - come back to this once the register form errors are working 
// async getLocation () {
//   try {
//     const postcode = this.state.registerForm.postcode
//     console.log(postcode);
//     const response = await getPostcodeInfo(postcode)
//     console.log(response)
//   } catch (err) {
//     console.log(err.response)
//   }
// }

// handleSubmit event for submitting the registration form
handleSubmit = async event => {
  event.preventDefault()
  // getPostcodeInfo()
  try{
    await registerUser(this.state.registerForm)
    this.props.history.push('/login')
  } catch (err) {
    this.setState({ errors: err.response.data.errors })
    console.log(err.response)
  }
}

  render() {
    // console.log(this.state.errors)
    return (
      <>
          <section className="section">
            <div className="container">
              <h1 className="title">Register</h1>
              <h2 className="subtitle">
                Register to join here
              </h2>
            </div>
          </section>
        <RegisterForm 
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
        {...this.state.registerForm}
        />
      </>
    )
  }
}

export default Register