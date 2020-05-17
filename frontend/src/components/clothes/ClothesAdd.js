import React from 'react'
import { addClothes } from '../../lib/api'

import ClothesForm from './ClothesForm'

class ClothesAdd extends React.Component{
state = {
  clothesForm: {
    title: '',
    category: '', 
    brand: '',
    genderCategory: '', 
    size: '', 
    color: [''], 
    rentalPrice: '', 
    image: ''
  }
}
  
  //handleChange event for inputting values on form 
  handleChange = event => {
    const clothesForm = {...this.state.clothesForm, [event.target.name]: event.target.value}
    this.setState({clothesForm})
  }

  //handle Multi change to deal with selecting different colours
  handleMultiChange = selected => {
    const selectedItems = selected ? selected.map(item => item.value) : []
    const clothesForm = {...this.state.clothesForm, color: selectedItems}
    this.setState({clothesForm})
  }

// function to allow user to upload multiple images or links to the clothing item
handleAddImage = () => {
  const clothesForm = { ...this.state.clothesForm, image: [...this.state.clothesForm.image, ''] }
  this.setState({ clothesForm})
}

// handleImageChange = (event, i) => {
//   const images = [...this.state.clothesForm.image]
//   const newImages = images.map((image, index) => {
//     if (i === index) return event.target.value
//     return image
//   })
//   const clothesForm = {...this.state.clothesForm, image: newImages}
//   this.setState({ clothesForm })
// }


// submits the add clothes form 
  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await addClothes(this.state.clothesForm)
      this.props.history.push(`/clothes/${res.data._id}`)
    } catch (err) {
      console.log(err.response);
    }
    
  }

  render() {
    return(
      <>
      <h1>Add Clothes</h1>
      <ClothesForm 
      handleChange={this.handleChange}
      handleMultiChange={this.handleMultiChange}
      handleSubmit={this.handleSubmit}
      clothesForm={this.state.clothesForm}
      // onChange={this.handleImageChange}
      onClick={this.handleAddImage}
      />
      </>
    )
  }
}

export default ClothesAdd
