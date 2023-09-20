import React from 'react'
import { Link } from 'react-router-dom'
export default function () {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" aria-current="page" to="/">Sportz Interactive</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
  </button> 
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" to="Venue">Venue Management</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Equipment">Equipment Inventory</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Booking Management</a>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Schedule">Schedule</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}
