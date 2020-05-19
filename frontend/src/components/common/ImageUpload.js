import React from 'react'

import { postImage } from '../../lib/ext_api'




class ImageUpload extends React.Component{
  
  state = {
    image: null
  }
  
  handleUpload = async event => {
    const files = event.target.files
    const preset = (this.props.preset)
    const data = new FormData()
    for (let x =0; x<5; x++) {
    data.append('file', event.target.files[x])
    data.append('upload_preset', preset)
    }
    const res = await postImage(data)

    this.setState({
        image: files
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
            //! need to add this in so you can upload multiple and then it shows you multiple
            //  multiple 
            onChange={this.handleUpload}
          />
        </>
      }
    </>
    )
  }
}

export default ImageUpload