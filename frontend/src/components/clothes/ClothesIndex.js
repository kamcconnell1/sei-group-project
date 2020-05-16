import React from 'react'


import { showAllClothes } from '../../lib/api'

import ClothCard from './ClothCard'

class ClothesIndex extends React.Component {
  state = { 
    clothes: null, 
    filteredClothes: null,
    color: null,
    searchClothes: ''
  }

  // * Function to GET all clothes 
  async componentDidMount() {
    try {
      const res = await showAllClothes()
      this.setState({ clothes: res.data, filteredClothes: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  // * Function to handle search box input
  // ! Search more than one item in the array
  handleChange = event => {
    const {clothes} = this.state
    const searchClothes = event.target.value
    const filteredClothes = clothes.filter(cloth => {
      const regex = RegExp(searchClothes, 'i')
      return cloth.category.match(regex) || cloth.title.match(regex)
    })
    this.setState({searchClothes, filteredClothes})
  }


  render() {
    if (!this.state.filteredClothes) return <h1>Some Ninjas are fixing this</h1>
    const { filteredClothes } = this.state
    console.log(filteredClothes)
    // console.log(filteredClothes)
    return (
      <>
        <section className="hero is-light">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Latest Items
      </h1>
            </div>
          </div>
        </section>
        <div>
          Filter
        </div>
        <div>
          <form className="column is-one-quarter is-offset-one-quarter box">
          <input
          className="input"
          type="text"
          placeholder="Search Item"
          onChange={this.handleChange}
          />
          </form>
        </div>
        <div className="columns is-multiline">
          {filteredClothes.map(cloth => 
            <ClothCard
            {...cloth}
            key={cloth._id}
            />
            )}
        </div>
      </>
    )
  }
}

export default ClothesIndex