import React, {useState, useRef} from 'react'
import './Reg.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Reg() {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);


    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
        console.log(form);
    }

    const registerHandler = async () => {
        try {
            await axios.post('/users/register', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => console.log(response))
        } catch (error) {
            console.log(error)
        }
    }

    // const usernameRef = useRef();
    // const emailRef = useRef();
    // const passwordRef = useRef();

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     const newUser = {
    //       username: usernameRef.current.value,
    //       email: emailRef.current.value,
    //       password: passwordRef.current.value,
    //     }
    
    //     try {
    //       await axios.post("/users/register", newUser)
    //     } catch (error) {
    //       console.log(error);
    //     }
    // }

  return (
    <div className='auth'>
        <h3 className='auth__name'>Регистрация</h3>
        <form className='form__login' onSubmit={e => e.preventDefault()}>
            <div className='row'>
                <div className='auth__input__field'>
                    <input type='text' name='username' className='auth_validate' placeholder='Username' onChange={changeHandler}  />
                </div>
                <div className='auth__input__field'>
                    <input type='email' name='email' className='auth_validate' placeholder='Email' onChange={changeHandler}  />
                 </div>
                <div className='auth__input__field'>
                    <input type='password' name='password' className='auth_validate' placeholder='Password' onChange={changeHandler}  />
                </div>
                <div className='auth__reg'>
                    <span>Есть аккаунт? <Link to='/login'>Войти</Link> </span>
                </div>
            </div>
            <div className='row'>
                <button className='auth__button' type="submit" onClick={registerHandler}>Зарегистрироваться</button>
            </div>
        </form>
    </div>
  )
}

export default Reg