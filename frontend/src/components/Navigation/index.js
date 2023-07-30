// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink,useHistory,Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }){
  let history=useHistory()
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='topBanner'>
<Link exact to="/">
<img className='logo' src={process.env.PUBLIC_URL + '/frontendImages/Capture.JPG'} alt='airBnbLogo' /></Link>
    <ul className='noBullets'>
      {/* <li>
        <NavLink exact to="/">Home</NavLink>
      </li> */}
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
    </div>
  );
}

export default Navigation;
