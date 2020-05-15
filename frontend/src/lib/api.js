import axios from 'axios'

const kebb_url = '/api'

// * login user POST function
export const loginUser = loginForm => {
  return axios.post(`${kebb_url}/login`, loginForm)
}

// * register user POST function
export const registerUser = registerForm => {
  return axios.post(`${kebb_url}/register`, registerForm)
}