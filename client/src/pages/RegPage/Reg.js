// import React from 'react'
import './Reg.css'
import { Link } from 'react-router-dom'

function Reg() {
  return (
    <div className='auth'>
        <h3 className='auth__name'>Регистрация</h3>
        <form className='form__login'>
            <div className='row'>
                <div className='auth__input__field'>
                    <input type='text' name='username' className='auth_validate' placeholder='Username'/>
                </div>
                <div className='auth__input__field'>
                    <input type='email' name='email' className='auth_validate' placeholder='Email'/>
                 </div>
                <div className='auth__input__field'>
                    <input type='password' name='password' className='auth_validate' placeholder='Password'/>
                </div>
                <div className='auth__reg'>
                    <span>Есть аккаунт? <Link to='/login'>Войти</Link> </span>
                </div>
            </div>
            <div className='row'>
                <button className='auth__button'>Зарегистрироваться</button>
            </div>
        </form>
    </div>
  )
}

export default Reg