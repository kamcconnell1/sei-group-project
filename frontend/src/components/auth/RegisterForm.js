import React from 'react'

const RegisterForm = ({handleChange, handleSubmit, username, email, postcode, password, passwordConfirmation, errors }) => {

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="columns">
            <form 
            onSubmit={handleSubmit}
            className="column is-half is-offset-one-quarter box"
            >

              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input 
                  className={`input ${errors.username ? 'is-danger': '' }`} 
                  type="text" 
                  placeholder="Enter Username here" 
                  name="username"
                  value={username}
                  onChange={handleChange}
                  />
                  </div>
                  {errors.username && <small className="help is-danger">{errors.username}</small>}
                </div>

                <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input 
                  className="input" 
                  type="text" 
                  placeholder="Enter email here" 
                  name="email"
                  value={email}
                  onChange={handleChange}
                  />
                  </div>
                </div>

                <div className="field">
                <label className="label">Postcode</label>
                <div className="control">
                  <input 
                  className="input" 
                  type="text" 
                  placeholder="Please add your postcode" 
                  name="email"
                  value={postcode}
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
                  placeholder="Enter password here" 
                  name="password"
                  value={password}
                  onChange={handleChange}
                  />
                  </div>
                </div>

                <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input 
                  className="input" 
                  type="password" 
                  placeholder="Confirm password here" 
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={handleChange}
                  />
                  </div>
                </div>
              <div className="field">
              <button type="submit" className="button is-fullwidth is-primary">Register</button>
              </div>
            </form>
          </div>
          </div>
      </section>

    </>
  )
}

export default RegisterForm