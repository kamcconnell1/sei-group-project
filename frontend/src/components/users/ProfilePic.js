import React from 'react'

import { avatarArr } from '../common/Images'
import { uploadProfileImage } from '../../lib/ext_api'
import ImageUpload from '../common/ImageUpload'

const ProfilePic = ({onClick, modalStatus, onChange}) => {

  return (

    <div 
    onClick={onClick}
    className={modalStatus ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="columns is-multiline">
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
          labelText="Upload Profile Picture"
          />
      </div>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  )
}

export default ProfilePic