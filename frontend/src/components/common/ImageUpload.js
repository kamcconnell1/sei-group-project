import React from 'react'
import axios from 'axios'

const uploadUrl = 'https://api.cloudinary.com/v1_1/kamcconnell1/image/upload'
const uploadPreset = 'hpazye5v'

class ImageUpload extends React.Component{
state = {
  profilePic: null
}

handleUpload = async event => {
  const data = new FormData()
  data.append('file', event.target.files[0])
  data.append('upload_preset', uploadPreset)
  const res = await axios.post(uploadUrl, data)
  this.setState({
    profilePic: res.data.url
  }, () => {
    this.props.onChange({ target: { name: this.props.name, value: this.state.profilePic } })
  })
}




  render() {
    const { profilePic } = this.state

    return (
      <>
      {profilePic ?
        <div>
          <img src={profilePic} alt="selected"/>
        </div>
        :
        <>
          <label className="label">{this.props.labelText || 'Upload Image'}</label>
          <input
            className="input"
            type="file"
            onChange={this.handleUpload}
          />
        </>
      }
    </>
    )
  }
}

export default ImageUpload