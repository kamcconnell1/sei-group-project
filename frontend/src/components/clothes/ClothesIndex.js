import React from "react"
// ! Filter function yet to be completed - Benga
import { showAllClothes } from "../../lib/api"
import ClothCard from "./ClothCard"
// import Select from 'react-select'
import ClothesFilter from "./ClothesFilter"
class ClothesIndex extends React.Component {
  state = {
    clothes: null,
    filteredClothes: null,
    filteredCategories: null,
    searchClothes: "",
    filteredItemsToDisplay: []
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
      this.setState({ clothes: res.data, filteredClothes: res.data, categories: filteredCategory, colors: filteredColor, genders: filteredGender, sizes: filteredSize, filteredCategories: filteredCategory })
    } catch (err) {
      console.log(err)
    }
  }
  // * Function to handle search box input - user can search by category, title and username
  handleChange = (event) => {
    const { clothes } = this.state
    const searchClothes = event.target.value
    const filteredClothes = clothes.filter((cloth) => {
      const regex = RegExp(searchClothes, "i")
      return (
        cloth.category.match(regex) ||
        cloth.title.match(regex) ||
        cloth.user.username.match(regex)
      )
    })
    this.setState({ searchClothes, filteredClothes })
  }
  // * Function to allow user to filter clothing intems
  // ! To be completed - by Benga

  // filterChange = event => {
  //   const {filteredClothes} = this.state
  //   const showFilter = event.value
  //   if (filteredClothes.length > 0) {
  //     const filteredCats = filteredClothes.filter(cloth => {
  //       const regex = RegExp(showFilter, 'i')
  //       return (cloth.category.match(regex) || cloth.color[0].match(regex) || cloth.genderCategory.match(regex) || cloth.size.match(regex))
  //     })
  //     console.log(event.value)
  //   } else {return 'unavailable'}
  //   this.setState({filteredClothes: filteredCats})
  // }
  // handleFilter = (e, field) => {
  //   this.setState({[field]: e.value}, )
  // }
  // filterValues = () => {
  //   const {filteredClothes} = this.state
  //   const filteredItems = filteredClothes.filter((cloth) => {
  //     if (!filteredClothes) {
  //       return true
  //     }
  //     if (filteredClothes) {
  //       return cloth.ca
  //     }
  //   })
  // }
  handleFilter = (e, field) => {
    this.setState({ [field]: e.value }, this.getFilteredItems)
  }
  getFilteredItems = () => {
    const { category, color, gender, size, clothes } = this.state
    const filteredItemsToDisplay = clothes.filter((item) => {
      if (!category && !color && !gender && !size) {
        return true
      }
      if (category && color && gender && size) {
        return (
          item.category.includes(category) &&
          item.color.includes(color) &&
          item.genderCategory.includes(gender) &&
          item.size.includes(size)
        )
      }
      if (category && color && !gender && !size) {
        return (
          item.category.includes(category) &&
          item.color.includes(color)
        )
      } else if (category && gender && !color && !size) {
        item.category.includes(category) &&
          item.genderCategory.includes(gender)
      }
      else
        return (
          item.category.includes(category) ||
          item.color.includes(color) ||
          item.genderCategory.includes(gender) ||
          item.size.includes(size)
        )
    })
    this.setState({ filteredItemsToDisplay })
  }

  filterChange = event => {
    const { filteredClothes } = this.state
    const showFilter = event.value
    if (filteredClothes.length > 0) {
      const filteredCats = filteredClothes.filter(cloth => {
        const regex = RegExp(showFilter, 'i')
        return (cloth.category.match(regex) || cloth.color[0].match(regex) || cloth.genderCategory.match(regex) || cloth.size.match(regex))
      })
      this.setState({ filteredClothes: filteredCats })
      console.log(event.value)
    } else { return 'unavailable' }

  }


  render() {

    if (!this.state.filteredClothes)
      return <h1>Some Ninjas are working on this</h1>
    const {
      filteredClothes,
      colors,
      categories,
      genders,
      searchClothes,
      sizes,
      filteredItemsToDisplay
    } = this.state
    console.log('Filtered clothes:', filteredClothes)
    console.log('Item to display:', filteredItemsToDisplay)



    console.log(filteredClothes)


    // * Variable of category options
    const categoryOption = categories.map((cat) => {
      return { value: cat, label: cat }
    })
    // * Variable of color options
    const colorOption = colors.map((col) => {
      return { value: col, label: col }
    })
    // * Variable of Gender options
    const genderOption = genders.map((gen) => {
      return { value: gen, label: gen }
    })
    // * Variable of Size options
    const sizeOption = sizes.map((size) => {
      return { value: size, label: size }
    })
    // ! Needs to include range filter to filter price - Benga
    return (
      <>
        <div className="Page-head">
          <div className="Page-title">
            <h1>KEBB Clothes</h1>
          </div>
          <div className="Page-subtitle">
            <h2>Latest Items</h2>
          </div>
        </div>
        <div className="Latest column-center">
          <div className="Clothes-filter">
            <ClothesFilter
              category={categoryOption}
              color={colorOption}
              gender={genderOption}
              sizes={sizeOption}
              handleCategoryFilter={(e) => this.handleFilter(e, "category")}
              handleColorFilter={(e) => this.handleFilter(e, "color")}
              handleGenderFilter={(e) => this.handleFilter(e, "gender")}
              handleSizeFilter={(e) => this.handleFilter(e, "size")}
            />
            <form>
              <input
                className="input"
                type="text"
                placeholder="Search for Category, Name and User"
                value={searchClothes}
                onChange={this.handleChange}
              />
            </form>
          </div>
          <div className="Clothes-index">
            {(filteredItemsToDisplay.length) > 0 ? filteredItemsToDisplay.map(cloth => <ClothCard {...cloth} key={cloth._id} />) : filteredClothes.map((cloth) => (
              <ClothCard {...cloth} key={cloth._id} />
            ))}
          </div>
        </div>
      </>
    )
  }
}

export default ClothesIndex