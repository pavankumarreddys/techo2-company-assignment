import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const [log,setLog] = useState(false)
useEffect(()=>{
let data = localStorage.getItem("islogin")
if(data){
  setLog(true)
}
else{
  setLog(false)
}
},[])
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              
            </Link>
            <ul className="navbar-nav auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              {!log?
              <>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
              </>
              :
              <li className="nav-item">
                <button className="btn btn-link nav-link">
                  Logout
                </button>
              </li>
            }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
