import axios from 'axios'
import { getToken } from './auth'

const kebb_url = '/api'

//* function to add the headers to the secure routes 
const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}`}
  }
}

// * Function to get all clothing Items
export const showAllClothes = () => {
  return axios.get(`${kebb_url}/clothes`)
}

// * login user POST function
export const loginUser = loginForm => {
  return axios.post(`${kebb_url}/login`, loginForm)
}

// * register user POST function
export const registerUser = registerForm => {
  return axios.post(`${kebb_url}/register`, registerForm)
}

//* user POST clothes article function
export const addClothes = clothesForm => {
  return axios.post(`${kebb_url}/clothes`, clothesForm, withHeaders())
}