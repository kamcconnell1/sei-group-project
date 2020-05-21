import React from 'react'


const PinForm = ({ modalStatus, handleChange, handleSubmit, numberOfPins, toggleModal, errors, form }) => {

  // const pinNumber = numberOfPins()

  // console.log(pinNumber);
  // console.log('all errors', errors);
  // console.log('pin,error', errors['pins.0.place']);
  // // ["pins.0.place"]
  // const errorMessage = (['pins',[pinNumber],'place'])
  // console.log(errorMessage.join());
  

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
                value={form.title}
                onChange={handleChange}
              />
            </div>
            <small className="help is-light">Title is required</small>
          </div>

          <div className="field">
            <label className="label">Shop Name</label>
            <div className="control">
              <input
                className={`input ${errors.place ? 'is-danger' : ''}`}
                type="text"
                placeholder="Where?"
                name="place"
                value={form.place}
                onChange={handleChange}
              />
            </div>
            <small className="help is-light">Location details are required</small>
          </div>

          <div className="field">
            <label className="label">Notes</label>
            <div className="control">
              <textarea
                className="textarea"
                rows="3"
                type="text"
                placeholder="Notes"
                name="note"
                value={form.note}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <button
              type="submit"
              className="button is-fullwidth is-primary"
            >Save Location</button>
          </div>
        </form>
        <button
          className="modal-close is-large"
          onClick={toggleModal}
          aria-label="close">
          </button>
      </div>
    </div>


  )
}

export default PinForm