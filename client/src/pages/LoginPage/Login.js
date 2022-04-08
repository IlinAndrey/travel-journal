import React, {useState, useContext} from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/authContext'

function Login() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const { login } = useContext(AuthContext)

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
        console.log(form);
    }

    const loginHandler = async () => {
        try {
            await axios.post('/users/login', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                login(response.data.token, response.data.userId)
            })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='auth'>
        <h3 className='auth__name'>Вход</h3>
        <form className='form__login' onSubmit={e => e.preventDefault()}>
            <div className='row'>
                <div className='auth__input__field'>
                    <input type='text' name='username' className='auth_validate' placeholder='Username' onChange={changeHandler} />
                </div>
                <div className='auth__input__field'>
                    <input type='password' name='password' className='auth_validate' placeholder='Password' onChange={changeHandler} />
                </div>
                <div className='auth__reg'>
                    <span>Нет аккаунта? <Link to='/register'>Зарегистрироваться</Link> </span>
                </div>
            </div>
            <div className='row'>
                <button className='auth__button' type="submit" onClick={loginHandler}>Войти</button>
            </div>
        </form>
    </div>
  )
}

export default Login