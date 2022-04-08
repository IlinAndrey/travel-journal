// import React from 'react'
import './Navbar.css'
import { Link, Outlet } from 'react-router-dom'

function Navbar() {
  return (
    <div className='div__nav'>
        <nav className='nav'>
            <div className='nav__wr'>
                <Link to='/' className='nav__logo'>Travel Journal</Link>
                <ul className='nav__list'>
                    <li className='nav__l'><Link to='login'>Войти</Link></li>
                    <li className='nav__l'><Link to='register'>Регистрация</Link></li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar