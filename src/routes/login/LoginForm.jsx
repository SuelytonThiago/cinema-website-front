import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import './LoginForm.css';
import { useLoginMutate } from '../../hooks/UseLoginMutate.jsx';
import { Link } from 'react-router-dom';

const LoginForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const mutation = useLoginMutate();

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const validateErrors = () => {
    const errors = {};
    if (email.trim() === '') {
      errors.email = 'O campo não pode estar em branco';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Insira um email válido';
    }

    if (password.trim() === '') {
      errors.password = 'O campo não pode estar em branco';
    }

    return errors;
  };

  const handleLoginUser = (e) => {
    e.preventDefault();
    const validate = validateErrors();
    setErrors(validate);

    if (Object.keys(validate).length === 0) {
      mutation.mutate({ email, password }, {
        onSuccess: () => {
          if (onSuccess) onSuccess();
        },
      });
    }
  };

  return (
    <div className='signFormContainer'>
      {mutation.isError && <div className='serverErrorMessage'>Email ou senha inválidos</div>}
      <form onSubmit={handleLoginUser} className='signinForm'>
        <div className='signinFormControl'>
          <label htmlFor="email"></label>
          <input
            type="text"
            placeholder="Digite um email"
            id="email"
            autoComplete='current-email'
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className='errorMessage'>{errors.email}</div>}
        </div>
        <div className='signinFormControl'>
          <label htmlFor="password"></label>
          <div className='passwordInput'>
            <input
              type={show ? 'text' : 'password'}
              placeholder="Digite uma senha"
              id="password"
              autoComplete='current-password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleTogglePassword}>
              {show ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
            </button>
          </div>
          {errors.password && <div className='errorMessage'>{errors.password}</div>}
        </div>
        <Link to={`/recover`}>
          <p class="forgoutPass">esqueceu sua senha?</p>
        </Link>
        <input type="submit" value="Entrar" className='signin-btn' />
        <div className='register-link-btn'>
          <p>Ainda não tem uma conta? <span><Link to={"/register"} className='regislink'>Cadastre-se agora</Link></span></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
