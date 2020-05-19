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
    image: ['']
  }, 
  errors: {}
}
  
  //handleChange event for inputting values on form 
  handleChange = event => {
    const clothesForm = {...this.state.clothesForm, [event.target.name]: event.target.value}
    const errors = { ...this.state.errors, [event.target.name]: ''}
    this.setState({clothesForm, errors})
  }

  //handle Multi change to deal with selecting different colours
  handleMultiChange = selected => {
    const selectedItems = selected ? selected.map(item => item.value) : []
    const clothesForm = {...this.state.clothesForm, color: selectedItems}
    const errors = { ...this.state.errors, color: ''}
    this.setState({clothesForm, errors})
  }

// function to allow user to upload multiple images or links to the clothing item
handleAddImage = () => {
  const clothesForm = { ...this.state.clothesForm, image: [...this.state.clothesForm.image, ''] }
  const errors = { ...this.state.errors, image: ''}
  this.setState({ clothesForm, errors})
}

handleImageChange = (event, i) => {
  const images = [...this.state.clothesForm.image]
  const newImages = images.map((image, index) => {
    if (i === index) return event.target.value
    return image
  })
  const clothesForm = {...this.state.clothesForm, image: newImages}
  const errors = { ...this.state.errors, image: ''}
  this.setState({ clothesForm, errors })
}


// submits the add clothes form 
  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await addClothes(this.state.clothesForm)
      this.props.history.push(`/clothes/${res.data._id}`)
    } catch (err) {
      this.setState({ errors: err.response.data})
      console.log(err.response);
    }
    
  }

  render() {
    console.log(this.state.clothesForm);
    
    return(
      <>
      <h1>Add Clothes</h1>
      <ClothesForm 
      onChange={this.handleImageChange}
      onClick={this.handleAddImage}

      handleChange={this.handleChange}
      handleMultiChange={this.handleMultiChange}
      handleSubmit={this.handleSubmit}
      clothesForm={this.state.clothesForm}
      errors={this.state.errors}
      />
      </>
    )
  }
}

export default ClothesAdd
