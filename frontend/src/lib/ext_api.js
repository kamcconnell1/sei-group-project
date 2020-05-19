//------------------------------------FILE FOR EXTERNAL API REQUESTS -----------------------

import axios from 'axios'

const imageUrl = process.env.REACT_APP_CLOUDINARY_URL

//* POST request for user to upload image - hosted on cloudinary
export const postImage = data => {
  return axios.post(imageUrl, data)
}
// export const uploadProfileImage = process.env.REACT_APP_PROFILE_IMAGE_PRESET


export const uploadClothesImage = process.env.REACT_APP_IMAGE_PRESET

//* GET request to find the postcode details of user /item
export const getPostcodeInfo = postcode => {
  return axios.get(`http://api.postcodes.io/postcodes/${postcode}`)
}