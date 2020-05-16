import React from 'react'

import RegisterForm from './RegisterForm'
import {registerUser} from '../../lib/api'

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

// handleSubmit event for submitting the registration form
handleSubmit = async event => {
  event.preventDefault()
  try{
    await registerUser(this.state.registerForm)
    this.props.history.push('/login')
  } catch (err) {
    // this.setState({ errors: err.response.data.errors })
    console.log(err)
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