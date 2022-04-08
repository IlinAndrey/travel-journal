import React from 'react'
import './Navbar.css'

function Navbar() {
  return (
    <div className='div__nav'>
        <nav className='nav'>
            <div className='nav__wr'>
                <a href='/' className='nav__logo'>Travel Journal</a>
                <ul className='nav__list'>
                    <li className='nav__l'><a href='/'>Войти</a></li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar