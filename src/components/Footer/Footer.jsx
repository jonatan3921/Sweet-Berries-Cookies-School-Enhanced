import React from 'react'
import './Footer.css'
import logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom'

function Footer() {
    const navigate = useNavigate()

  return (
    <div className='footer-container'>
        <img src={logo} alt="logo" onClick={() => navigate('/')}/>
    </div>
  )
}

export default Footer