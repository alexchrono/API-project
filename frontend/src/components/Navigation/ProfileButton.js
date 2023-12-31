// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import {Link,useHistory} from 'react-router-dom'
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css'

function ProfileButton({ user }) {
  const history=useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {user && (
          <><Link exact to='/spots/new'><button type="button">Create a New Spot</button></Link></>)}
      <button id="openMenu" onClick={openMenu}>
      <span class="material-symbols-outlined">
menu
</span>
<span class="material-symbols-outlined">
account_circle
</span>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>

            <li>{user.username}</li>
            <li>{`Hello ${user.firstName}`}</li>
            <li>{user.email}</li>
            <li>
              <button type="button" onClick={(e)=>{
                history.push('/spots/manageSpots')
              }}>Manage Spots</button>
            </li>
            <li>
              <button type="button" onClick={(e)=>{
                history.push('/reviews/current')
              }}>Manage Reviews</button>
            </li>
            <li>
              <button onClick={(e)=>{
                e.preventDefault();
                dispatch(sessionActions.logout());
                closeMenu()
                history.push('/')}}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
            <li>
              <button type="button" onClick={(e)=>{
                const credential="Demo-lition"
                const password='password'
                closeMenu()
                return dispatch(sessionActions.login({ credential, password }))}}
                >Demo User</button>
            {/* <OpenModalButton
                buttonText="Demo User"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              /> */}
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
