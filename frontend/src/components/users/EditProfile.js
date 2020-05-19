import React from 'react'

import { avatarArr } from '../common/Images'
import { uploadProfileImage } from '../../lib/ext_api'
import ImageUpload from '../common/ImageUpload'

const EditProfile = ({onClick, modalStatus, onChange}) => {

  return (

    <div 
    className={modalStatus ? "modal is-active" : "modal"}
    >
      <div className="modal-background"></div>
      <form >
      <div className="modal-content">
        <div className="is-profile-picture is-centered is-primary">
          Select a New Avatar
          </div>
        <div className="columns is-multiline ">
          {avatarArr.map((avatar, i) => 
          <div className="column" key={i}>
        <div className="image is-96x96" >
          <img src={avatar}  alt={avatar}/>
        </div>
        </div>
          )}
          <ImageUpload 
          onChange={onChange}
          preset={uploadProfileImage}
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

         */}
      <div className="field">
              <button type="submit" onClick={onClick} className="button is-fullwidth is-primary">Update Profile</button>
              </div>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
      </form>
    </div>
  )
}

export default EditProfile