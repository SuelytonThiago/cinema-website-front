import React, { useState } from 'react';
import useForm from '../../hooks/UseForm.jsx';
import InputText from '../../components/input-form/InputText.jsx';
import { InputSubit } from '../../components/Input.js';
import InputWithoutFilter from '../../components/input-form/InputWithoutFilter.jsx';
import backend from '../../../api/index.ts'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser } from '../../redux/user/actions.js';
import { ForgoutPass, RegisterLinkBtn, SigninForm } from './styles.js';
import { Regislink } from '../../components/Link.js';

const LoginForm = ({loginSuccess}) => {

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()

  const initialState = {
    email: '',
    password: '',
  };

  const { formData, handleChange } = useForm(initialState);


  const validateErrors = () => {
    const errors = {};
    if (formData.email.trim() === '') {
      errors.email = 'O campo não pode estar em branco';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Insira um email válido';
    }

    if (formData.password.trim() === '') {
      errors.password = 'O campo não pode estar em branco';
    }

    return errors;
  };

  const handleLoginUser = async (e) => {
    e.preventDefault();
    const validate = validateErrors();
    setErrors(validate);

    if (Object.keys(validate).length === 0) {
      try {
        const responseLogin = await backend.authAPI.login(formData)

        Cookies.set('accessToken', responseLogin.data.accessToken);
        Cookies.set('refreshToken', responseLogin.data.refreshToken);

        const accessToken = Cookies.get('accessToken')
        const responseUser = await backend.userAPI.findById({
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        
        localStorage.setItem("user", JSON.stringify(responseUser.data));
        dispatch(loginUser(responseUser.data));
        loginSuccess();

      } catch (err) {
        toast.error('Email ou senha inválidos')
        console.log(err)
      }


    }
  };

  return (
    <div className='signFormContainer'>
      <SigninForm onSubmit={handleLoginUser}>
        <InputText
          error={errors.email}
          handleChange={handleChange}
          nameInput={'email'}
          value={formData.email}
          placeholder={'* Digite o seu email'} />

        <InputWithoutFilter
          error={errors.password}
          handleChange={handleChange}
          nameInput={"password"} 
          placeholder={'* Digite sua senha'} />

        <ForgoutPass to={`/recover`}>
          <p>esqueceu sua senha?</p>
        </ForgoutPass>

        <InputSubit type="submit" value="Entrar" />
        <RegisterLinkBtn>
          <p>Ainda não tem uma conta? <span><Regislink to={"/register"}>Cadastre-se agora</Regislink></span></p>
        </RegisterLinkBtn>
      </SigninForm>
    </div>
  );
};

export default LoginForm;
