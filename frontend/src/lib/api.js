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
export const getUser = () => {
  return axios.get(`${kebb_url}/profile`, withHeaders())
}