import axios from 'axios'
import { getToken } from './auth'

const kebb_url = '/api'

//* function to add the headers to the secure routes 
const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}`}
  }
}
//---------------------------------- CLOTHING REQUESTS --------------------------------------
// * Function to get all clothing Items
export const showAllClothes = () => {
  return axios.get(`${kebb_url}/clothes`)
}

//* user POST clothes article function
export const addClothes = clothesForm => {
  return axios.post(`${kebb_url}/clothes`, clothesForm, withHeaders())
}

// * Function to get single clothing item
export const singleCloth = id => {
  return axios.get(`${kebb_url}/clothes/${id}`)
}


//------------------------------------USER REQUESTS--------------------------------------------
// * login user POST function
export const loginUser = loginForm => {
  return axios.post(`${kebb_url}/login`, loginForm)
}

// * register user POST function
export const registerUser = registerForm => {
  return axios.post(`${kebb_url}/register`, registerForm)
}

//* get user for PROFILE page 
export const getProfile = () => {
  return axios.get(`${kebb_url}/profile`, withHeaders())
}

//* PUT request to edit user PROFILE Page
  export const editProfile = (profileData) => {
    return axios.put(`${kebb_url}/profile`, profileData,  withHeaders())
  }

// * GET to show specific user (no need to be logged in)
  export const getUserProfile = id => {
    return axios.get(`${kebb_url}/profile/${id}`)
  }

  //* POST for user to add pin to their map 
  export const postPin = pinForm => {
    return axios.post(`${kebb_url}/profile/pins`, pinForm, withHeaders())
  }