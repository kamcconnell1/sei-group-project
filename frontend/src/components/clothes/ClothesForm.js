import React from 'react'
import Select from 'react-select'

import ImageUpload from '../common/ImageUpload'
import { uploadClothesImage } from '../../lib/ext_api'

const colorOptions = [
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
  { value: 'red', label: 'Red' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'orange', label: 'Orange' },
  { value: 'purple', label: 'Purple' },
  { value: 'brown', label: 'Brown' },
  { value: 'silver', label: 'Silver' },
  { value: 'gold', label: 'Gold' },
  { value: 'pink', label: 'Pink' },
  { value: 'camel', label: 'Camel' },
  { value: 'grey', label: 'Grey' },
  { value: 'stone', label: 'Stone' }
]

const ClothesForm = ({ handleChange, handleSubmit, handleMultiChange, formData, onClick, onChange, errors}) => {
  const { title, category, genderCategory, size, rentalPrice, image, brand } = formData


  return (
        <div className="column">
          <form
            className="box"
            onSubmit={handleSubmit}
          >

            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className={`input ${errors.title ? 'is-danger': '' }`} 
                  type="text"
                  placeholder="Give your item a title!"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              {errors.title && <small className="help is-danger">{errors.title}</small>}
            </div>

            {/* This input should be changed to a multi select to select categories fit into */}
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <input
                  className={`input ${errors.category ? 'is-danger': '' }`} 
                  type="text"
                  placeholder="What category is this item..."
                  name="category"
                  value={category}
                  onChange={handleChange}
                />
              </div>
              {errors.category && <small className="help is-danger">{errors.category}</small>}
            </div>

            <div className="field">
              <label className="label">Brand</label>
              <div className="control">
                <input
                  className={`input ${errors.brand ? 'is-danger': '' }`} 
                  type="text"
                  placeholder="Item brand"
                  name="brand"
                  value={brand}
                  onChange={handleChange}
                />
              </div>
              {errors.brand && <small className="help is-danger">{errors.brand}</small>}
            </div>

            <div className="field">
              <label className="label">This item is for...</label>
              <div className="control">
                <label className="radio">
                  <input
                    type="radio"
                    name="genderCategory"
                    value="Women"
                    onChange={handleChange}
                    checked={genderCategory === 'Women'}
                  />
                    Women
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="genderCategory"
                    value="Men"
                    onChange={handleChange}
                    checked={genderCategory === 'Men'}
                  />
                    Men
                </label>
              </div>
              {errors.genderCategory && <small className="help is-danger">Please select an input</small>}
            </div>

            <div className="field">
              <label className="label">Size</label>
              <div className="control">
                <div className={`select ${errors.size ? 'is-danger': '' }`}>
                  <select
                    name="size"
                    value={size}
                    onChange={handleChange}>
                    <option disabled value=""></option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
              </div>
              {errors.genderCategory && <small className="help is-danger">Please select a size</small>}
            </div>

            <div className="field">
              <label className="label">Colour</label>
              <div className="control">
                <Select
                  options={colorOptions}
                  placeholder="Please select a colour / colours.."
                  name="color"
                  isMulti
                  onChange={handleMultiChange}
                />
              </div>
              {errors.size && <small className="help is-danger">Please select a colour</small>}
            </div>

            <div className="field">
              <label className="label">Rental Price</label>
              <div className="control">
                <input
                  className={`input ${errors.rentalPrice ? 'is-danger': '' }`} 
                  type="number"
                  placeholder="How much will this rent for (per week)?"
                  name="rentalPrice"
                  value={rentalPrice}
                  onChange={handleChange}
                />
              </div>
              {errors.rentalPrice && <small className="help is-danger">{errors.rentalPrice}</small>}
            </div>
            <div className="field">
              {errors.image && <small className="help is-danger">Please upload some images</small>}
              <div className="control">
                {image.map((image, index) => {
                  return (
                    <ImageUpload
                      key={index}
                      onChange={args => onChange(args, index)}
                      preset={uploadClothesImage}
                      name="image"
                      labelText="Please add an image(s)"
                    />
                  )
                })
                }
                {image.length < 5 && <button className="Button" onClick={onClick}>Add Another Image</button>}
              </div>
      
            <div className="field">
            <div class="buttons has-addons is-right">
              <button type="submit" className="button is-warning is-medium is-light">Add Item</button>
              </div>
            </div>
            </div>
          </form>
        </div>
  )
}

export default ClothesForm

