import React from 'react'
import PropTypes from 'prop-types'
import './navbar.css'
import { Link } from 'react-router-dom'
export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">{props.title}</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Login
            </a>
            <ul className="dropdown-menu">
              
              <li><Link className="dropdown-item" to="/LoginForm">Admin Login</Link></li>
              <li><Link className="dropdown-item" to="/LoginFormU">Employee Login</Link></li>
            </ul>
          
          </li>
        </ul>
      </div>
    </div>
  </nav>
   )
}
Navbar.propTypes = {
    title:PropTypes.string.isRequired,
    }