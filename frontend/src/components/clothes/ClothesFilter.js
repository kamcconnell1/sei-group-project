import React from "react"
import Select from "react-select"
// import InputRange from 'react-input-range'
const ClothesFilter = ({
  color,
  category,
  gender,
  sizes,
  handleCategoryFilter,
  handleSizeFilter,
  handleGenderFilter,
  handleColorFilter
}) => {
  return (
    <>
      <div className=" filter column is-one-quarter">
        <Select
          options={category}
          placeholder={"Categories"}
          onChange={handleCategoryFilter}
          name="category"
        />
      </div>
      <div className=" filter column is-one-quarter">
        <Select
          options={color}
          placeholder={"Colors"}
          onChange={handleColorFilter}
        />
      </div>
      <div className=" filter column is-one-quarter">
        <Select
          options={gender}
          placeholder={"Genders"}
          onChange={handleGenderFilter}
        />
      </div>
      <div className=" filter column is-one-quarter">
        <Select
          options={sizes}
          placeholder={"Size"}
          onChange={handleSizeFilter}
        />
      </div>
    </>
  )
}
export default ClothesFilter