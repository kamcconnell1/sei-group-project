import React from 'react'

// ! Filter function yet to be completed - Benga


import { showAllClothes } from '../../lib/api'

import ClothCard from './ClothCard'
// import Select from 'react-select'
import ClothesFilter from './ClothesFilter'

class ClothesIndex extends React.Component {
  state = {
    clothes: null,
    filteredClothes: null,
    color: null,
    category: null,
    gender: null,
    sizes: null,
    searchClothes: ''
  }

  // * Function to GET all clothes and get data for filter functions
  async componentDidMount() {
    try {
      const res = await showAllClothes()
      const category = res.data.map(cat => cat.category)
      const filteredCategory = category.filter((cat, index) => category.indexOf(cat) === index)
      const color = res.data.map(col => col.color)
      const colorArray = color.reduce((acc, col) => { return acc.concat(col) }, [])
      const filteredColor = colorArray.filter((col, index) => colorArray.indexOf(col) === index)
      const gender = res.data.map(gen => gen.genderCategory)
      const filteredGender = gender.filter((gen, index) => gender.indexOf(gen) === index)
      const sizes = res.data.map(size => size.size)
      const filteredSize = sizes.filter((size, index) => sizes.indexOf(size) === index)
      this.setState({ clothes: res.data, filteredClothes: res.data, category: filteredCategory, color: filteredColor, gender: filteredGender, sizes: filteredSize })
    } catch (err) {
      console.log(err)
    }
  }

  // * Function to handle search box input - user can search by category, title and username
  handleChange = event => {
    const { clothes } = this.state
    const searchClothes = event.target.value
    const filteredClothes = clothes.filter(cloth => {
      const regex = RegExp(searchClothes, 'i')
      return cloth.category.match(regex) || cloth.title.match(regex) || cloth.user.username.match(regex)
    })
    this.setState({ searchClothes, filteredClothes })
  }

  // * Function to allow user to filter clothing intems
  // ! To be completed - by Benga
  filterChange = event => {
    console.log(event.target.value)
  }


  render() {
    if (!this.state.filteredClothes) return <h1>Some Ninjas are working on this</h1>
    const { filteredClothes, color, category, gender, searchClothes, sizes,} = this.state

    // * Variable of category options
    const categoryOption = category.map(cat => { return {value: cat, label: cat}})
    
    // * Variable of color options
    const colorOption = color.map(col => { return {value: col, label: col}})
    
    // * Variable of Gender options
    const genderOption = gender.map(gen => { return {value: gen, label: gen}})

    // * Variable of Size options
    const sizeOption = sizes.map(size => {return {value: size, label: size}})

    // ! Needs to include range filter to filter price - Benga

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
        <div className="column is-one-quarter">
          <form>
            <input className="input" 
            type="text" 
            placeholder="Search for Category, Name and User" 
            value={searchClothes}
            onChange={this.handleChange}
            />
          </form>
        </div>
        <section className="section is-dark">
            <div className="container">
              <div className="columns is-multiline">
              <ClothesFilter
                category={categoryOption}
                color={colorOption}
                gender={genderOption}
                sizes={sizeOption}
                filterChange={this.filterChange}
              />
            </div>
            </div>
        </section>
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
