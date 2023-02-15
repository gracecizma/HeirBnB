import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <navbar className="nav-bar">
        <h1 className="home">
          <NavLink exact to="/">
            <img src="../../images/favicon-32x32.png" alt="crown" />
            HeirBnB
          </NavLink>
        </h1 >
        <div className="nav-buttons">
          <div className="create-new-button">
            <NavLink exact to="/spots">
              <button>
                Create New Spot
              </button>
            </NavLink>
          </div>
          <div className="user-menu">
            <ProfileButton user={sessionUser} />
          </div>
        </div>

      </navbar>
    </>


  );
}

export default Navigation;
