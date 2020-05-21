import React from 'react'
import EditProfileForm from '../users/EditProfileForm'
import EditClothCard from '../users/EditClothCard'
import { editProfile, getProfile, deleteCloth } from '../../lib/api'
import { deletedItemToast } from '../../lib/toasts'

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
      await this.getEditDashboard()
    } catch (err) {
      console.log(err)
    }
  }
  
  async getEditDashboard() {
    try {
      const res = await getProfile()
      this.setState({ formData: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  //* Function to update the user profile info
  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

  //*Submit profile info update
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

  //*Delete item of clothing
  deleteArticle = async (_id) => {
    try {
      await deleteCloth(_id)
      deletedItemToast()
      this.getEditDashboard()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.formData.createdArticles ) return null
    const { createdArticles } = this.state.formData

    return (
      <div>
        <EditProfileForm
          errors={this.state.errors}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          {...this.state.formData}
        />
        <div className="My-items-index">
          {createdArticles.map(item =>
            <EditClothCard
              deleteArticle={this.deleteArticle}
              {...item}
              key={`${item._id}1`}
            />)}
        </div>
      </div>
    )
  }
}


export default EditProfile