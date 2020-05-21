import React from 'react'
import { postImage } from '../../lib/ext_api'


class ImageUpload extends React.Component{
  state = {
    image: null
  }



//! Might need to add some error handling on this function 
  handleUpload = async event => {
    event.preventDefault()
    // Cloudinary preset passed in as props 
    const preset = (this.props.preset)
    
    // Append file to FormData with the preset
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', preset)

    // Axios request to send image to Cloudinary
    const res = await postImage(data)

    //Set state with link to image sent in response data
    this.setState({
        image: res.data.url
      }, () => { 
        //Use setstates callback function to pass the updated state into the function and back into formData on reqd page 
          this.props.onChange({ target: { name: this.props.name, value: this.state.image } })
        })
      }
      

      
      render() {
        const { image } = this.state
    return (
      <>
      {image ?
        <div>
          <img src={image} alt="selected"/>
          <input
            className="input"
            type="file"
            name={this.props.name}
            onChange={this.handleUpload}
          />
        </div>
        :
        <>
          <input
            className="input"
            type="file"
            name={this.props.name}
            onChange={this.handleUpload}
          />
        </>
      }
    </>
    )
  }
}
export default ImageUpload