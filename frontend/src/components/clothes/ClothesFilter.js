import React from "react"
import Select from "react-select"

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
        <Select className="Clothes-select"
          options={category}
          placeholder={"Categories"}
          onChange={handleCategoryFilter}
          name="category"
        />
        <Select className="Clothes-select"
          options={color}
          placeholder={"Colors"}
          onChange={handleColorFilter}
        />
        <Select className="Clothes-select"
          options={gender}
          placeholder={"Genders"}
          onChange={handleGenderFilter}
        />
        <Select className="Clothes-select"
          options={sizes}
          placeholder={"Size"}
          onChange={handleSizeFilter}
        />
    </>
  )
}
export default ClothesFilter