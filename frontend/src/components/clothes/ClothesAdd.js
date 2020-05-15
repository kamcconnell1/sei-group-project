import React from 'react'
import { addClothes } from '../../lib/api'

import ClothesForm from './ClothesForm'

class ClothesAdd extends React.Component{
state = {
  clothesForm: {
    title: '',
    category: '', 
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
      />
      </>
    )
  }
}

export default ClothesAdd
