import React from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { auth } from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'

function Header() {
    const navigate = useNavigate()

    // Get the user Data
    const [user] = useAuthState(auth);

  return (
    <div className='header-container'>
        <nav>
            <Link to={'/courses'} className='link'>Courses</Link>
            <Link to={'/aboutus'} className='link'>About us</Link>
        </nav>
        <img src={logo} alt="logo" onClick={() => navigate('/')}/>
        {
          user
          ? <div className='user'>
            <span className='username' onClick={() => navigate(`/account/${user.displayName}`)}>
              {
                user.displayName
                ? user.displayName
                : user.email
              }
            </span>
          </div>
          : <button onClick={() => navigate('/auth')}>Get Started</button>
        }
    </div>
  )
}

export default Header