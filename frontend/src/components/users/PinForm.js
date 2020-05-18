import React from 'react'


const PinForm = ({handleChange, handleSubmit, title, place, location, notes, errors }) => {

  return (
    <form
      onSubmit={handleSubmit}
      className="column is-3"
    >

      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className={`input ${errors.title ? 'is-danger' : ''}`}
            type="text"
            placeholder="Enter Username here"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        {errors.title && <small className="help is-danger">{errors.title}</small>}
      </div>

      <div className="field">
        <label className="label">Shop Name</label>
        <div className="control">
          <input
            className={`input ${errors.place ? 'is-danger' : ''}`}
            type="text"
            placeholder="Enter Username here"
            name="place"
            value={place}
            onChange={handleChange}
          />
        </div>
        {errors.place && <small className="help is-danger">{errors.place}</small>}
      </div>

      <div className="field">
        <label className="label">Postcode</label>
        <div className="control">
          <input
            className={`input ${errors.location ? 'is-danger' : ''}`}
            type="text"
            placeholder="Enter Username here"
            name="location"
            value={location}
            onChange={handleChange}
          />
        </div>
        {errors.location && <small className="help is-danger">{errors.location}</small>}
      </div>

      <div className="field">
        <label className="label">Notes</label>
        <div className="control">
          <textarea
            className="textarea"
            rows="3"
            type="text"
            placeholder="Enter Username here"
            name="notes"
            value={notes}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="field">
              <button type="submit" className="button is-fullwidth is-primary">Add Pin</button>
              </div>
    </form>


  )
}

export default PinForm