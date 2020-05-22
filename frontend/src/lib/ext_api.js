//------------------------------------FILE FOR EXTERNAL API REQUESTS -----------------------


import axios from 'axios'

//* Cloudinary URL connection to .env
const imageUrl = process.env.REACT_APP_CLOUDINARY_URL

//* POST request for user to upload image - hosted on cloudinary
export const postImage = data => {
  return axios.post(imageUrl, data)
}

//* Image preset link to .env
export const uploadClothesImage = process.env.REACT_APP_IMAGE_PRESET

//* GET request to find the postcode details of user /item
export const getPostcodeInfo = postcode => {
  return axios.get(`http://api.postcodes.io/postcodes/${postcode}`)
}