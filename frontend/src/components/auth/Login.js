import React from 'react'

import LoginForm from './LoginForm'

class Login extends React.Component{
  state = {
    loginForm: {
      username: '',
      password: ''
    }
  } 


  //handleChange event for inputting values on form 
  handleChange = event => {
    const loginForm = {...this.state.loginForm, [event.target.name]: event.target.value}
    this.setState({loginForm})
  }

  // handleSubmit event for submitting the login form
handleSubmit = event => {
  event.preventDefault()
  console.log('I am submitting')
}

  render() {
    console.log(this.state.loginForm)
    return (
      <>
      <section className="section">
        <div className="container">
          <h1 className="title">Login</h1>
          <h2 className="subtitle">
            Login here
          </h2>
        </div>
      </section>
      <LoginForm 
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      {...this.state.loginForm}
      />
  </>
    )
  }
}

export default Login