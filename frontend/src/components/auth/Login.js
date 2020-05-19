import React from 'react'

import LoginForm from './LoginForm'

import {loginUser, getProfile} from '../../lib/api'
import {setToken, setUsername } from '../../lib/auth'


class Login extends React.Component{
  state = {
    formData: {
      email: '',
      password: ''
    }, 
    error: ''
  } 


  //handleChange event for inputting values on form 
  handleChange = event => {
    const formData = {...this.state.formData, [event.target.name]: event.target.value}
    this.setState({formData, error: '' })
  }

  // handleSubmit event for submitting the login form
handleSubmit = async event => {
  event.preventDefault()
  try{
    const res = await loginUser(this.state.formData)
    setToken(res.data.token)
    const response = await getProfile()
    setUsername(response.data.username)
    this.props.history.push(`/profile/${response.data.username}`)
  } catch (err) {
    this.setState({ error: 'Invalid Credentials' })
  }
}


  render() {
    // console.log(this.state.formData)
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
      errors={this.state.error}
      {...this.state.formData}
      />
  </>
    )
  }
}

export default Login