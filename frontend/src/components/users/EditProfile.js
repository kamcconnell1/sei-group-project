import React from 'react'

import { avatarArr } from '../common/Images'
import { uploadClothesImage } from '../../lib/ext_api'
import ImageUpload from '../common/ImageUpload'

const EditProfile = ({ onChange, handleSubmit, toggleModal, modalOpen, profilePic }) => {

  return (

    <div
      className={modalOpen ? "modal is-active" : "modal"}
    >
      <div className="modal-background"></div>

      {/* <div className="edit-profile-form">
        <form
          className="box"
          onSubmit={handleSubmit}
        > */}
      <div className="modal-content">

        <div className="field">
          <div className="is-profile-picture is-centered is-primary">
            Select a New Avatar
          </div>
          <div className="columns is-multiline ">
            <div className="image is-96x96" >
              <img
                name="profilePic"
                src={avatarArr[0]} alt="avatar1"
                onClick={onChange}
              />
            </div>
          </div>

          <ImageUpload
            onChange={onChange}
            preset={uploadClothesImage}
            name="profilePic"
            labelText="Or Upload Picture"
          />
        </div>

        {/* <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Username here"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter email here"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
              </div> */}

        <div className="field">
          <button type="submit"
            className="button is-fullwidth is-primary">
            Update Profile
          </button>
        </div>
      </div >
      {/* </div> */}

      {/* </form > */}
      <button
        className="modal-close is-large"
        onClick={toggleModal}
        aria-label="close"></button>
    </div>

  )
}

export default EditProfile