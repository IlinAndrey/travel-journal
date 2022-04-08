// import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='auth'>
        <h3 className='auth__name'>Вход</h3>
        <form className='form__login'>
            <div className='row'>
                <div className='auth__input__field'>
                    <input type='text' name='username' className='auth_validate' placeholder='Username'/>
                </div>
                <div className='auth__input__field'>
                    <input type='password' name='password' className='auth_validate' placeholder='Password'/>
                </div>
                <div className='auth__reg'>
                    <span>Нет аккаунта? <Link to='/register'>Зарегистрироваться</Link> </span>
                </div>
            </div>
            <div className='row'>
                <button className='auth__button'>Войти</button>
            </div>
        </form>
    </div>
  )
}

export default Login