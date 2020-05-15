import React from 'react'
import Select from 'react-select'

const ClothesForm = () => {

const colorOptions = [
  { value: 'red', label: 'Red'},
  { value: 'red', label: 'Red'},
  { value: 'red', label: 'Red'},
  { value: 'red', label: 'Red'},
  { value: 'red', label: 'Red'},
]

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form
            className="column is-half is-offset-one-quarter box"
          >

            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Give your item a title!"
                  name="title"
                />
              </div>
            </div>

            {/* This input should be changed to a multi select to select categories fit into */}
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="What category is this item..."
                  name="category"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">This item is for...</label>
              <div className="control">
                <div className="select">
                  <select name="genderCategory">
                  <option disabled value=""></option>
                    <option>Men</option>
                    <option>Women</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Size</label>
              <div className="control">
                <div className="select">
                  <select name="size">
                    <option disabled value=""></option>
                    <option>8</option>
                    <option>10</option>
                    <option>12</option>
                    <option>14</option>
                    <option>16</option>
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                </div>
              </div>
            </div>

{/* Change  to multiselect*/}
            <div className="field">
              <label className="label">Colour</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Please select a colour / colours.."
                  name="color"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Rental Price</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="How much will this rent for (per week)?"
                  name="rentalPrice"
                />
              </div>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}

export default ClothesForm