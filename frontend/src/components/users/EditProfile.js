import React from 'react'
import EditProfileForm from '../users/EditProfileForm'
import { editProfile, getProfile } from '../../lib/api'

class EditProfile extends React.Component {
  state = {
    user: '',
    formData: {
      username: '',
      postcode: ''
    },
    errors: {}
  }

  async componentDidMount() {
    try {
      const res = await getProfile()
      this.setState({ formData: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await editProfile(this.state.formData)
      this.props.history.push(`/profile/${res.data.username}`)
    } catch (err) {
      this.setState({ errors: err.response.data })
      console.log(err.response);
    }
  }

  render() {

    return (
      <EditProfileForm
        errors={this.state.errors}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        {...this.state.formData}
      />
    )
  }
}


export default EditProfile