import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <nav className="navbar is-dark" >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" >Home</Link>
          <Link to="/about" className="navbar-item" >About Us</Link>
          <Link to="/clothes" className="navbar-item" >Latest Items</Link>
          {/* //! the clothes add page should only be linked from the user profile page but just put a link here for now */}
          <Link to="/user/:id/add" className="navbar-item">Add an Item</Link>
          <Link to="/register" className="navbar-item">Register</Link>
          <Link to="login" className="navbar-item">Login</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar