import React from 'react';
import { useState, useRef } from 'react';
import './Register.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import InputMask from 'react-input-mask';
import isValidCPF from '../../js/cpfValidation';
import isValidContactNumber from '../../js/phoneValidation';
import isValidEmail from '../../js/emailValidation';
import isValidName from '../../js/nameValidation';
import isValidPassword from '../../js/passwordValidation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [cpf, setCpf] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState();

  const [show, setShow] = useState(false);

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShow(!show);
  }

  const validate = () => {
    const errors = {}

    if (!isValidCPF(cpf)) {
      errors.cpf = 'insira um cpf válido';
    }

    if (!isValidContactNumber(contactNumber)) {
      errors.contactNumber = 'insira um telefone válido';
    }

    if (!isValidEmail(email)) {
      errors.email = 'insira um email válido';
    }

    if (!isValidName(name)) {
      errors.name = 'insira um nome válido';
    }

    if (!isValidPassword(password)) {
      errors.password = 'a senha deve conter 8 caracteres incluindo letras e números';
    }

    if (password !== confirm) {
      errors.confirm = 'as senhas não coincidem';
    }

    return errors;
  }

  const createUser = async (e) => {
    e.preventDefault();

    const user = {
      name: name,
      email: email,
      cpf: cpf,
      contactNumber: contactNumber,
      password: password,
    }

    const validateErrors = validate();
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length === 0) {
      try {
        await axios.post('/users/create', user);
        navigate('/login');
      } catch (e) {
        const error = e.response.data.Message
        setServerError(error);
      }
    }
  }

  return (
    <>
      <div className='registerContainer'>
        <div>
          {serverError && <div className='serverErrorMessage'>{serverError}</div>}
        </div>
        <form onSubmit={(e) => createUser(e)} className='registerForm'>
          <div className={errors.name ? 'inputError' : 'registerFormControl'}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              id="name"
              onChange={(e) => setName(e.target.value)}

            />
            {errors.name && <div className='errorMessage'>{errors.name}</div>}
          </div>
          <div className={errors.name ? 'inputError' : 'registerFormControl'}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="digite um email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className='errorMessage'>{errors.email}</div>}
          </div>
          <div className={errors.name ? 'inputError' : 'registerFormControl'}>
            <label htmlFor="cpf">CPF</label>
            <InputMask
              mask='999.999.999-99'
              placeholder='digite seu CPF'
              id='cpf'
              onChange={(e) => setCpf(e.target.value)}
              className='inputMask'
            />
            {errors.cpf && <div className='errorMessage'>{errors.cpf}</div>}
          </div>
          <div className={errors.name ? 'inputError' : 'registerFormControl'}>
            <label htmlFor="contactNumber">Telefone</label>
            <InputMask
              mask='(99)99999-9999'
              placeholder="digite seu telefone"
              id="contactNumber"
              onChange={(e) => setContactNumber(e.target.value)}
              className='inputMask'
            />
            {errors.contactNumber && <div className='errorMessage'>{errors.contactNumber}</div>}
          </div>
          <div className={errors.name ? 'inputError' : 'registerFormControl'}>
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
            {errors.password && <div className='errorMessage'>{errors.password}</div>}
          </div>
          <div className={errors.name ? 'inputError' : 'registerFormControl'}>
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <div className='passwordInput'>
              <input
                type={show ? 'text' : 'password'}
                placeholder='repita a senha'
                id="confirmPassword"
                onChange={(e) => setConfirm(e.target.value)}
              />
              <button onClick={(e) => handleTogglePassword(e)}>
                {show ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
              </button>
            </div>
            {errors.confirm && <div className='errorMessage'>{errors.confirm}</div>}
          </div>
          <input type="submit" value="Criar conta" className='register-btn' />
        </form>
      </div>
    </>
  )
}

export default Register