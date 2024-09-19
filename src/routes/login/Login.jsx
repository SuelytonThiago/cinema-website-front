import React from 'react';
import { useState} from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import {useLoginMutate} from '../../hooks/UseLoginMutate.jsx'

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  const mutation = useLoginMutate();
  

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

  const handleLoginUser = (e) => {
    e.preventDefault();
    const validate = validateErrors();
    setErrors(validate);
  
    if (Object.keys(validate).length === 0) {
      mutation.mutate({email, password},
        {
          onSuccess: () => {
            navigate('/')
          }
        });
    }
  }

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShow(!show);
  }
  

  return (
    <div className='signinContainer'>
      <div className='signFormContainer'>
        {mutation.isError && <div className='serverErrorMessage'>email ou senha invalidos</div>}
        <form onSubmit={(e) => handleLoginUser(e)} className='signinForm'>
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