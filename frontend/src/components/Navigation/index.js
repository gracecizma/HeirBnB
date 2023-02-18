import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <div className="nav-bar">
        <div className="home">
          <NavLink exact to="/">
            <img src="../../images/favicon-32x32.png" alt="crown" />
          </NavLink>
          <NavLink exact to="/" className="logo-text">
            <h1 className="header">
              HeirBnB
            </h1>
          </NavLink>
        </div >
        <div className="nav-bar-buttons">
          <div className="create-new-container">
            <NavLink exact to="/spots" className="create-new-link">
              Create New Spot
            </NavLink>
          </div>

          <div className="user-menu-button">
            <ProfileButton user={sessionUser} />
          </div>
        </div>

      </div>
    </>


  );
}

export default Navigation;
