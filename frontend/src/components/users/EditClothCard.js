import React from 'react'
import { Link } from 'react-router-dom'

const EditClothCard = ({ _id, title, image, rentalPrice, deleteArticle }) => {
  
  return (
      <div className="My-items-card">
        <div className="img">
        <img src={image[0]} alt={title} loading="lazy" width="255" height="255" />
        </div>
        <div className="Card-text">
          <Link to={`/clothes/${_id}/edit`}
          id={_id}>
          <button className="My-profile-update-btn">Update</button>
          </Link>
          <button 
          onClick={() => { if (window.confirm("Are you sure?")) deleteArticle(_id) }} 
          className="My-profile-delete-btn">Delete</button>
        
        </div>
      </div>
  )
}

export default EditClothCard