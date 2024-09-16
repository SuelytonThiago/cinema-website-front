import React from 'react';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './Login.css';



import Cookies from 'js-cookie';
import axios from 'axios';

const Login = ({handleLoginSuccess}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShow(!show);
  }

  const validateErrors = () => {
    const errors = {};
    if(email.trim() === ''){
      errors.email = 'o campo não pode estar em branco'
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      errors.email = 'insira um email válido'
    }

    if(password.trim() === ''){
      errors.password = 'o campo não pode estar em branco'
    }

    return errors;
  }

  const signIn = async (e) => {
    e.preventDefault();
    setServerError('');
    
    const login = {
      email: email,
      password: password
    };
  
    const validate = validateErrors();
    setErrors(validate);
  
    if (Object.keys(validate).length === 0) {
      try {
        const response = await axios.post("http://localhost:8080/api/auth/login", login, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        const aToken = response.data.accessToken;
        const rToken = response.data.refreshToken;
  
        Cookies.set('accessToken', aToken);
        Cookies.set('refreshToken', rToken);
        handleLoginSuccess();
      } catch (e) {
        setServerError("email ou senha inválidos");
      }
    } 
  };
  

  return (
    <div className='signinContainer'>
      <div className='signFormContainer'>
        {serverError && <div className='serverErrorMessage'>{serverError}</div>}
        <form onSubmit={(e) => signIn(e)} className='signinForm'>
          <div className='signinFormControl'>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="digite um email"
              id="email"
              autoComplete='current-email'
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className='errorMessage'>{errors.email}</div>}
          </div>
          <div className='signinFormControl'>
            <label htmlFor="password">Senha</label>
            <div className='passwordInput'>
              <input
                type={show ? 'text' : 'password'}
                placeholder="digite uma senha"
                id="password"
                autoComplete='current-password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <button  type="button" onClick={(e) => handleTogglePassword(e)}>
                {show ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
              </button>
            </div>
            {errors.password && <div className='errorMessage'>{errors.password}</div>}
          </div>
          <input type="submit" value="Entrar" className='signin-btn' />
        </form>
      </div>
    </div>
  )
}

export default Login