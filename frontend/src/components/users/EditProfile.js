import React from 'react'
import EditProfileForm from '../users/EditProfileForm'
import { editProfile, getProfile } from '../../lib/api'

<<<<<<< HEAD
const EditProfile = ({ onChangeEdit, onSubmitEdit, toggleModalEdit, modalOpenEdit, username, errors }) => {
  return (
    <div
      className={modalOpenEdit ? "modal is-active" : "modal"}
    >
      
      <div className="Edit-profile-form">
      <div className="modal-background"></div>
        <form
          className="box"
          onSubmit={onSubmitEdit}
        >
          <div className="modal-content">
            <div className="field" >
              <label className="label">Username</label>
              <div className="control">
                <input
                  className={`input ${errors ? 'is-danger' : '' }`}
                  type="text"
                  placeholder="Enter Username here"
                  name="username"
                  value={username}
                  onChange={onChangeEdit}
                />
              </div>
            </div>
            <div className="field">
              <button type="submit"
                className="button is-fullwidth is-primary">
                Update Profile
          </button>
            </div>
          </div >
        </form >
        <button
          className="modal-close is-large"
          onClick={toggleModalEdit}
          aria-label="close"></button>
      </div>
    </div>
  )
=======
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
     this.setState({formData: res.data })
   } catch (err) {
     console.log(err)
   }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: ''}
    this.setState({ formData, errors})
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await editProfile(this.state.formData)
      this.props.history.push(`/profile/${res.data.username}`)
    } catch (err) {
      this.setState({ errors: err.response.data})
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
>>>>>>> development
}


export default EditProfile