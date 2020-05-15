import React from 'react'

import RegisterForm from './RegisterForm'

class Register extends React.Component {
state = {
  registerForm: {
    username: '', 
    email: '', 
    password: '', 
    passwordConfirmation: ''
  }
}

//handleChange event for inputting values on form 
handleChange = event => {
  // console.log(event.target.value);
  const registerForm = {...this.state.registerForm, [event.target.name]: event.target.value }
  this.setState({registerForm})
}

// handleSubmit event for submitting the registration form
handleSubmit = event => {
  event.preventDefault()
  console.log('I am submitting')
}

  render() {
    console.log(this.state.registerForm)
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
        {...this.state.registerForm}
        />
      </>
    )
  }
}

export default Register