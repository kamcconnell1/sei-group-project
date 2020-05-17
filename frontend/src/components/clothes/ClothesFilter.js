import React from 'react'
import Select from 'react-select'
import InputRange from 'react-input-range'


const ClothesFilter = ({ color, category, gender, sizes, filterChange, prices }) => {
  return (
    <>
    <div className="column is-one-quarter is-offset-one-quarter box">
    <Select 
    options={category}
    placeholder={'Categories'}
    onChange={filterChange}
    value={category.value}
    />
    </div>
    <div className="column is-one-quarter is-offset-one-quarter box">
    <Select 
    options={color}
    placeholder={'Colors'}
    onChange={filterChange}
    />
    </div>
    <div className="column is-one-quarter is-offset-one-quarter box">
    <Select 
    options={gender}
    placeholder={'Genders'}
    onChange={filterChange}
    />
    </div>
    <div className="column is-one-quarter is-offset-one-quarter box">
    <Select 
    options={sizes}
    placeholder={'Size'}
    onChange={filterChange}
    />
    </div>
    <div className="column is-one-quarter is-offset-one-quarter box">
    <InputRange 
    maxValue={50}
    minValue={5}
    value={prices}
    onChange={filterChange}
    />
    </div>
    
    </>
  )
}

export default ClothesFilter