//* Function to set users token when logged in & set username in local sotrage
export const setToken = token => {
  window.localStorage.setItem('token', token)
}


// * Function to get users username
export const setUsername = username => {
  window.localStorage.setItem('username', username)
}


//* Function to get users token & username from local storage
export const getToken = () => {
  return window.localStorage.getItem('token')
}

//* Get user name for params
export const getUsername = () => {
  return window.localStorage.getItem('username')
}


const getPayload = () => { // * returns the decoded data from the token or false
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3) return false
  return JSON.parse(window.atob(parts[1]))
}

export const isOwner = id => {
  const userId = getPayload().sub
  return userId === id
}

export const getUser = () => {
  return getPayload().sub
}

export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.round(Date.now() / 1000) // * works out the time RIGHT NOW
  return now < payload.exp // * is RIGHT NOW earlier than EXPIRY TIME ON TOKEN
}

export const logout = () => {
  localStorage.removeItem('token')
}