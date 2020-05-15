import React from 'react'

import LoginForm from './LoginForm'

import {loginUser} from '../../lib/api'
import {setToken, getUser} from '../../lib/auth'

class Login extends React.Component{
  state = {
    loginForm: {
      email: '',
      password: ''
    }
  } 


  //handleChange event for inputting values on form 
  handleChange = event => {
    const loginForm = {...this.state.loginForm, [event.target.name]: event.target.value}
    this.setState({loginForm})
  }

  // handleSubmit event for submitting the login form
handleSubmit = async event => {
  event.preventDefault()
  try{
    const res = await loginUser(this.state.loginForm)
    setToken(res.data.token)
    const user = getUser()
    this.props.history.push(`/user/${user}`)
  } catch (err) {
    console.log(err)
  }
}

  render() {
    // console.log(this.state.loginForm)
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