import React from 'react'


const PinForm = ({ modalStatus, handleChange, handleSubmit, onClick, title, place, notes, errors }) => {

  return (
    <div
      className={modalStatus ? "modal is-active" : "modal"}
    >
      <div className="modal-background"></div>
      <div className="modal-content">
        <form
          onSubmit={handleSubmit}
          className="column is-3 is-pulled-left	"
        >

          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className={`input ${errors.title ? 'is-danger' : ''}`}
                type="text"
                placeholder="What was it you found here?"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </div>
            <small className="help is-danger">Title is required</small>
          </div>

          <div className="field">
            <label className="label">Shop Name</label>
            <div className="control">
              <input
                className={`input ${errors.place ? 'is-danger' : ''}`}
                type="text"
                placeholder="Where?"
                name="place"
                value={place}
                onChange={handleChange}
              />
            </div>
            <small className="help is-danger">Location details are required</small>
          </div>

          <div className="field">
            <label className="label">Notes</label>
            <div className="control">
              <textarea
                className="textarea"
                rows="3"
                type="text"
                placeholder="Notes"
                name="notes"
                value={notes}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <button
              type="submit"
              className="button is-fullwidth is-primary"
              onClick={onClick}
            >Save Location</button>
          </div>


        </form>
      </div>
    </div>


  )
}

export default PinForm