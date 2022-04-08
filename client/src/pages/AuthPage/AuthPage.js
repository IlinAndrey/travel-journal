import React from 'react'
import './AuthPage.css'

function AuthPage() {
  return (
    <React.Fragment>
        <div className='cont'>
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
                            <span>Нет аккаунта? <a href='/'>Зарегистрироваться</a> </span>
                        </div>
                    </div>
                    <div className='row'>
                        <button className='auth__button'>Войти</button>
                    </div>
                </form>
            </div>
        </div>
    </React.Fragment>
  )
}

export default AuthPage