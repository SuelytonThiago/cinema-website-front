import React from 'react';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import InputMask from 'react-input-mask';
import isValidEmail from '../../js/emailValidation';
import isValidPassword from '../../js/passwordValidation';
import { useNavigate } from 'react-router-dom';
import './Login.css';

import Cookies from 'js-cookie';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);

  const [serverError, setServerError] = useState();

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShow(!show);
  }

  const signIn = async(e) =>{
    e.preventDefault();
    const login = {
      email: email,
      password: password
    }
    try{
      const response = await axios.post("http://localhost:8080/auth/login",login);

      const aToken = response.data.accessToken;
      const rToken = response.data.refreshToken;

      Cookies.set('accessToken', aToken);
      Cookies.set('accessToken', rToken);

      navigate('/');

    }catch(e){
      const error = e.response.data.Message
      setServerError(error);
    }
  }

  return (
    <div className='signinContainer'>
      {serverError && <div className='serverErrorMessage'>{serverError}</div>}
      <form onSubmit={(e) => signIn(e)} className='signinForm'>
        <div className='signinFormControl'>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="digite um email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='signinFormControl'>
          <label htmlFor="password">Senha</label>
          <div className='passwordInput'>
            <input
              type={show ? 'text' : 'password'}
              placeholder="digite uma senha"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={(e) => handleTogglePassword(e)}>
              {show ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
            </button>
          </div>
        </div>
        <input type="submit" value="Entrar" className='signin-btn' />
      </form>
    </div>
  )
}

export default Login