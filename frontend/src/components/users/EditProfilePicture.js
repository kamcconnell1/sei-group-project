import React from 'react'

import { uploadClothesImage } from '../../lib/ext_api'
import ImageUpload from '../common/ImageUpload'

const EditProfilePicture = ({ onChange, onSubmit, toggleModal, modalOpen, profilePic }) => {

  return (

    <div
      className={modalOpen ? "modal is-active" : "modal"}
    >
      <div className="modal-background"></div>

      <div className="edit-profile-form">
        <form
          className="box"
          onSubmit={onSubmit}
        >
          <div className="modal-content">

            <div className="field">
              <div className="image is128x128">
                <ImageUpload
                  onChange={onChange}
                  preset={uploadClothesImage}
                  name="profilePic"
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
          onClick={toggleModal}
          aria-label="close"></button>
      </div>
    </div>
  )
}

export default EditProfilePicture