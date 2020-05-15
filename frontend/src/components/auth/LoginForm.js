import React from 'react'

const LoginForm = ({username, password, handleChange, handleSubmit}) => {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form 
          className="column is-half is-offset-one-quarter box"
          onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Username here"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <button type="submit" className="button is-fullwidth is-primary">Login</button>
              </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginForm