import React from 'react'


import { showAllClothes } from '../../lib/api'

import ClothCard from './ClothCard'
import Select from 'react-select'

class ClothesIndex extends React.Component {
  state = {
    clothes: null,
    filteredClothes: null,
    color: null,
    category: null,
    searchClothes: ''
  }

  // * Function to GET all clothes 
  async componentDidMount() {
    try {
      const res = await showAllClothes()
      const category = res.data.map(cat => cat.category)
      const filteredCategory = category.filter((cat, index) => category.indexOf(cat) === index)
      const color = res.data.map(col => col.color)
      const colorArray = color.reduce((acc, col) => { return acc.concat(col) }, [])
      const filteredColor = colorArray.filter((col, index) => colorArray.indexOf(col) === index)
      this.setState({ clothes: res.data, filteredClothes: res.data, category: filteredCategory, color: filteredColor })
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

  // * Function to allow user to filter clothing intems.



  render() {
    if (!this.state.filteredClothes) return <h1>Some Ninjas are fixing this</h1>
    const { filteredClothes } = this.state
    // * Variable of category options
  const categoryOption = [{ value: this.state.category.forEach(cat => <option>{cat}</option>) }, { label: this.state.category.map(cat => cat) }]

    // * Variable of color options
    const colorOption = [{ value: this.state.color.map(col => col) }, { lable: this.state.color.map(col => col) }]
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
        {/* Working on this now */}
        <div className="hero is-dark"> 
          <div className="column is-one-quarter is-offset-one-quarter box">
            <ul>
              <li>
                <select className="select is-one-quarter">
                {this.state.category.map(cat => <option key={cat}>{cat}</option>)}
            </select>
              </li>
            </ul>
          </div>
          <div className="column is-one-quarter is-offset-one-quarter box">
            <ul>
              <li>
                <Select
                  placeholder="color"
                  options={colorOption}
                />
              </li>
            </ul>
          </div>
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

{/* <select className="select">
{this.state.category.map(cat => <option key={cat}>{cat}</option>)}
            </select> */}