// Function to set users token when logged in
export const setToken = token => {
  window.localStorage.setItem('token', token)
}
// Function to get users token and store in local storage
export const getToken = () => {
  return window.localStorage.getItem('token')
}