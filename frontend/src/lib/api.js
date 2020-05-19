import axios from 'axios'
import { getToken } from './auth'
const kebb_url = '/api'
//* function to add the headers to the secure routes 
const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}
//---------------------------------- CLOTHING REQUESTS --------------------------------------
// * Function to get all clothing Items
export const showAllClothes = () => {
  return axios.get(`${kebb_url}/clothes`)
}
//* user POST clothes article function
export const addClothes = formData => {
  return axios.post(`${kebb_url}/clothes`, formData, withHeaders())
}
// * Function to get single clothing item
export const singleCloth = id => {
  return axios.get(`${kebb_url}/clothes/${id}`)
}
//* comment on single clothing item
export const addCommentCloth = (id, data) => {
  return axios.post(`${kebb_url}/clothes/${id}/comments`, data, withHeaders())
}
//* delete comment on single clothing item
export const deleteCommentCloth = (clothesid, commentid) => {
  return axios.delete(`${kebb_url}/clothes/${commentid}/comments/${clothesid}`, withHeaders())
}
//------------------------------------USER REQUESTS--------------------------------------------
// * login user POST function
export const loginUser = formData => {
  return axios.post(`${kebb_url}/login`, formData)
}
// * register user POST function
export const registerUser = formData => {
  return axios.post(`${kebb_url}/register`, formData)
}
//* get user for PROFILE page 
export const getProfile = () => {
  return axios.get(`${kebb_url}/profile`, withHeaders())
}
//* PUT request to edit user PROFILE Page
export const editProfile = user => {
  return axios.put(`${kebb_url}/profile`, user, withHeaders())
}
// * GET to show specific user (no need to be logged in)
export const getUserProfile = id => {
  return axios.get(`${kebb_url}/profile/${id}`)
}
//* POST for user to add pin to their map 
export const postPin = formData => {
  return axios.post(`${kebb_url}/pins`, formData, withHeaders())
}
// * POST Favourites to users favourite
export const postFavorite = data => {
  return axios.post(`${kebb_url}/favourites/article`, data, withHeaders())
}
// * GET all users favourites
export const allUsersFavourites = () => {
  return axios.get(`${kebb_url}/favourites`, withHeaders())
}
// * POST user to Friends favourite
export const postFavoriteFriend = data => {
  return axios.post(`${kebb_url}/favourites/friends`, data, withHeaders())
}
<<<<<<< HEAD
//------------------------------------USER REQUESTS--------------------------------------------
=======


//------------------------------------POSTS--------------------------------------------

>>>>>>> development
//* Get all POSTS
export const getAllPosts = () => {
  return axios.get(`${kebb_url}/posts`)
}
//* Create a POST
export const createPost = data => {
  return axios.post(`${kebb_url}/posts`, data, withHeaders())
}
//* Get single POST
export const getSinglePost = id => {
  return axios.get(`${kebb_url}/posts/${id}`)
}
//* Edit a post
<<<<<<< HEAD
export const editAPost = (id, data) => {
  return axios.put(`${kebb_url}/posts/${id}`, data, withHeaders())
=======
export const editPost = (id, data) => {
  return axios.put(`${kebb_url}/posts/${id}`, data, withHeaders())
}

//* Delete a post
export const deleteAPost = id => {
  return axios.delete(`${kebb_url}/posts/${id}`, withHeaders())
}

//* Comment on a post
export const commentOnPost = (id, data) => {
  return axios.post(`${kebb_url}/posts/${id}/comments`, data, withHeaders())
}

//* Delete Comment on post
export const DeleteCommentOnPost = (id, commentid) => {
  return axios.delete(`${kebb_url}/posts/${id}/comments/${commentid}`, withHeaders())
>>>>>>> development
}
//* Delete a post
export const deleteAPost = id => {
  return axios.delete(`${kebb_url}/posts/${id}`, withHeaders())
}