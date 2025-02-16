import React from 'react';
import { useState } from 'react';
import isValidCPF from '../../js/cpfValidation';
import isValidEmail from '../../js/emailValidation';
import isValidName from '../../js/nameValidation';
import isValidPassword from '../../js/passwordValidation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useForm from '../../hooks/UseForm.jsx'
import backend from '../../../api/index.ts'
import InputText from '../../components/input-form/InputText.jsx';
import InputMaskComponent from '../../components/input-form/InputMaskComponent.jsx';
import InputWithFilter from '../../components/input-form/InputWithFilter.jsx';
import InputWithoutFilter from '../../components/input-form/InputWithoutFilter.jsx';
import { AiOutlineClose } from 'react-icons/ai';
import { CrossBtn } from '../../components/Button.js';
import { BackgroundRegisterContainer, LogLink, RegisterContainer, RegisterControl, RegisterForm, RegisterFormControl } from './styles.js';
import { Regislink } from '../../components/Link.js';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';

const Register = () => {

  const { t } = useTranslation();

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const initialState = {
    name: '',
    email: '',
    cpf: '',
    contactNumber: '',
    newPassword: '',
    confirm: ''
  }

  const { formData, handleChange } = useForm(initialState)

  const [step, setStep] = useState(1);

  const validate = () => {
    const errors = {}

    if (!isValidCPF(formData.cpf)) {
      errors.cpf = t('validacao-cpf');
    }

    if (!isValidEmail(formData.email)) {
      errors.email = t('validacao-email');
    }

    if (!isValidName(formData.name)) {
      errors.name = t('validacao-nome');
    }

    if (!isValidPassword(formData.newPassword)) {
      errors.newPassword = t('validacao-senha-invalida');
    }

    if (!formData.contactNumber) {
      errors.contactNumber = t('validacao-campo-vazio');
    }

    if (!formData.confirm) {
      errors.confirm = t('validacao-campo-vazio');
    }

    if (formData.newPassword !== formData.confirm) {
      errors.confirm = t('validacao-senhas-diferentes');
    }

    return errors;
  }

  const changeStep = () => {
    setStep(prevStep => prevStep === 1 ? 2 : 1);
  }

  const createUser = async () => {
    const user = {
      name: formData.name,
      email: formData.email,
      cpf: formData.cpf,
      contactNumber: formData.contactNumber,
      password: formData.newPassword,
    }
    const validateErrors = validate();
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length === 0) {
      try {
        await backend.userAPI.createNewUser(user);
        navigate('/login');
      } catch (err) {
        toast.error(err.response.data.Message);
      }
    }
  }

  return (
    <>
      <BackgroundRegisterContainer>
        <CrossBtn to={'/'}><AiOutlineClose /></CrossBtn>
        <RegisterContainer>
          <h2>{t('h2-cadastro')}</h2>
          <p>{t('p-campos-obrigatorios')}</p>
          <RegisterForm>
            {step === 1 ? (
              <>

                <RegisterFormControl>
                  <label htmlFor="name">{t('label-nome')}</label>
                  <InputText
                    error={errors.name}
                    handleChange={handleChange}
                    nameInput={'name'}
                    value={formData.name}
                    placeholder={t('placeholder-digite-seu-nome')}
                    style={{width: '500px'}} />
                </RegisterFormControl>

                <div className={'registerFormControl'}>
                  <label htmlFor="email">{t('label-email')}</label>
                  <InputText
                    error={errors.email}
                    handleChange={handleChange}
                    nameInput={'email'}
                    value={formData.email}
                    placeholder={t('placeholder-digite-seu-email')} 
                    style={{width: '500px'}}/>
                </div>

                <div className={'registerFormControl'}>
                  <label htmlFor="cpf">{t('label-cpf')}</label>
                  <InputMaskComponent
                    error={errors.cpf}
                    handleChange={handleChange}
                    nameInput={'cpf'}
                    value={formData.cpf}
                    placeholder={t('placeholder-digite-seu-cpf')}
                    mask={'999.999.999-99'}
                    style={{width: '500px'}}/>
                </div>

                <div className={'registerFormControl'}>
                  <label htmlFor="contactNumber">{t('label-telefone')}</label>
                  <InputMaskComponent
                    error={errors.contactNumber}
                    handleChange={handleChange}
                    nameInput={'contactNumber'}
                    value={formData.contactNumber}
                    placeholder={t('placeholder-digite-seu-telefone')}
                    mask={"(99) 99999-9999"}
                    style={{width: '500px'}}/>
                </div>
              </>
            ) : (
              <>
                <div className={'registerFormControl'}>
                  <label htmlFor="newPassword">{t('label-senha')}</label>
                  <InputWithFilter 
                    handleChange={handleChange} 
                    error={errors.newPassword} 
                    newPassword={formData.newPassword}
                    style={{width: '500px'}}/>

                </div>
                <div className={'registerFormControl'}>
                  <label htmlFor="confirmPassword">{t('label-confirmar-senha')}</label>
                  <InputWithoutFilter
                    handleChange={handleChange}
                    error={errors.confirm}
                    nameInput={'confirm'}
                    placeholder={t('placeholder-novamente-sua-senha')}
                    style={{width: '500px'}}/>
                </div>
              </>
            )

            }
            <RegisterControl>
              <button onClick={changeStep} className='stepBtn'>{step === 1 ? t('botao-proximo') : t('botao-voltar') }</button>
              {step === 2 && (
                <button 
                  className='finishBtn' 
                  onClick={createUser}>
                  {t('criar-conta')}
                </button>
              )}

            </RegisterControl>
            <LogLink>{t('tem-uma-conta')} <span><Regislink to={"/login"} >{t('conecte-se')}</Regislink></span></LogLink>
          </RegisterForm>
        </RegisterContainer>
      </BackgroundRegisterContainer>
    </>
  )
}

export default Register