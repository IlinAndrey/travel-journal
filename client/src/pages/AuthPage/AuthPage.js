import React from 'react'
import './AuthPage.css'
import {Routes,
        Route
} from 'react-router-dom'
import Login from '../LoginPage/Login'
import Reg from '../RegPage/Reg'

function AuthPage() {
  return (
    <div className='cont'>
        <div className='auth'>
            <Routes>
                <React.Fragment>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Reg />} />
                </React.Fragment>
            </Routes>
        </div>
    </div>
  )
}

export default AuthPage