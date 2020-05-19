import React from 'react'
import { postImage } from '../../lib/ext_api'
class ImageUpload extends React.Component{
  state = {
    image: null
  }
  handleUpload = async event => {
    
    const preset = (this.props.preset)
    const data = new FormData()
    
    data.append('file', event.target.files[0])
    data.append('upload_preset', preset)
    const res = await postImage(data)
    console.log(res)
    this.setState({
        image: res.data.url
      }, () => {
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
        </div>
        :
        <>
          <label className="label">{this.props.labelText}</label>
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