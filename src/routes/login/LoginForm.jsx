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
import { ForgoutPass, FormContainer, RegisterLinkBtn, SigninForm } from './styles.js';
import { Regislink } from '../../components/Link.js';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';

const LoginForm = ({ loginSuccess }) => {

  const { t } = useTranslation();

  const dispatch = useDispatch()

  const initialState = {
    email: '',
    password: '',
  };

  const { formData, handleChange, errors, setErrors, handleOnFocus } = useForm(initialState);


  const validateErrors = () => {
    const errors = {};
    if (formData.email.trim() === '') {
      errors.email = t('validacao-campo-vazio');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('validacao-email');
    }

    if (formData.password.trim() === '') {
      errors.password = t('validacao-campo-vazio');
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
        toast.error(err.response.data.Message)
      }


    }
  };

  return (
    <div >
      <SigninForm onSubmit={handleLoginUser}>
        <FormContainer>
          <InputText
            error={errors.email}
            handleChange={handleChange}
            handleOnFocus={handleOnFocus}
            nameInput={'email'}
            value={formData.email}
            placeholder={t('placeholder-digite-seu-email')} />

          <InputWithoutFilter
            error={errors.password}
            handleChange={handleChange}
            handleOnFocus={handleOnFocus}
            nameInput={"password"}
            placeholder={t('placeholder-digite-sua-senha')} />

          <ForgoutPass to={`/recover`}>
            <p>{t('p-esqueceu-sua-senha')}</p>
          </ForgoutPass>
          <InputSubit type="submit" value={t('botao-entrar')} />
        </FormContainer>
        <RegisterLinkBtn>
          <p>{t('p-ainda-nao-tem-uma-conta')} <span><Regislink to={"/register"}>{t('cadastre-se')}</Regislink></span></p>
        </RegisterLinkBtn>
      </SigninForm>
    </div>
  );
};

export default LoginForm;
