import React from 'react'

const EditProfile = ({ onChangeEdit, onSubmitEdit, toggleModalEdit, modalOpenEdit, username, errors }) => {
  return (
    <div
      className={modalOpenEdit ? "modal is-active" : "modal"}
    >
      <div className="modal-background"></div>

      <div className="edit-profile-form">
        <form
          className="box"
          onSubmit={onSubmitEdit}
        >
          <div className="modal-content">
            <div className="field" >
              <label className="label">Username</label>
              <div className="control">
                <input
                  className={`input ${errors ? 'is-danger' : '' }`}
                  type="text"
                  placeholder="Enter Username here"
                  name="username"
                  value={username}
                  onChange={onChangeEdit}
                />
              </div>
            </div>
            <div className="field">
              <button type="submit"
                className="button is-fullwidth is-primary">
                Update Profile
          </button>
            </div>
          </div >
        </form >
        <button
          className="modal-close is-large"
          onClick={toggleModalEdit}
          aria-label="close"></button>
      </div>
    </div>
  )
}

export default EditProfile