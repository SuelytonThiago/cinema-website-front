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


const Register = () => {

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
      errors.cpf = 'insira um cpf válido';
    }

    if (!isValidEmail(formData.email)) {
      errors.email = 'insira um email válido';
    }

    if (!isValidName(formData.name)) {
      errors.name = 'insira um nome válido';
    }

    if (!isValidPassword(formData.newPassword)) {
      errors.newPassword = 'a senha deve conter 8 caracteres incluindo letras e números';
    }

    if (!formData.contactNumber) {
      errors.contactNumber = 'o telefone não pode estar vazio';
    }

    if (!formData.confirm) {
      errors.confirm = 'não pode ficar em branco';
    }

    if (formData.newPassword !== formData.confirm) {
      errors.confirm = 'as senhas não coincidem';
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
          <h2>Cadastre-se</h2>
          <p>Campos obrigatórios *</p>
          <RegisterForm>
            {step === 1 ? (
              <>

                <RegisterFormControl>
                  <label htmlFor="name">Nome</label>
                  <InputText
                    error={errors.name}
                    handleChange={handleChange}
                    nameInput={'name'}
                    value={formData.name}
                    placeholder={'* Digite o seu nome'}
                    style={{width: '500px'}} />
                </RegisterFormControl>

                <div className={'registerFormControl'}>
                  <label htmlFor="email">Email</label>
                  <InputText
                    error={errors.email}
                    handleChange={handleChange}
                    nameInput={'email'}
                    value={formData.email}
                    placeholder={'* Digite o seu email'} 
                    style={{width: '500px'}}/>
                </div>

                <div className={'registerFormControl'}>
                  <label htmlFor="cpf">CPF</label>
                  <InputMaskComponent
                    error={errors.cpf}
                    handleChange={handleChange}
                    nameInput={'cpf'}
                    value={formData.cpf}
                    placeholder={'* Digite o seu cpf'}
                    mask={'999.999.999-99'}
                    style={{width: '500px'}}/>
                </div>

                <div className={'registerFormControl'}>
                  <label htmlFor="contactNumber">Telefone</label>
                  <InputMaskComponent
                    error={errors.contactNumber}
                    handleChange={handleChange}
                    nameInput={'contactNumber'}
                    value={formData.contactNumber}
                    placeholder={'* Digite o seu Telefone'}
                    mask={"(99) 99999-9999"}
                    style={{width: '500px'}}/>
                </div>
              </>
            ) : (
              <>
                <div className={'registerFormControl'}>
                  <label htmlFor="newPassword">Senha</label>
                  <InputWithFilter 
                    handleChange={handleChange} 
                    error={errors.newPassword} 
                    newPassword={formData.newPassword}
                    style={{width: '500px'}}/>

                </div>
                <div className={'registerFormControl'}>
                  <label htmlFor="confirmPassword">Confirmar senha</label>
                  <InputWithoutFilter
                    handleChange={handleChange}
                    error={errors.confirm}
                    nameInput={'confirm'}
                    placeholder={'*Digite novamente sua senha'}
                    style={{width: '500px'}}/>
                </div>
              </>
            )

            }
            <RegisterControl>
              <button onClick={changeStep} className='stepBtn'>{step === 1 ? 'Próximo' : 'Voltar'}</button>
              {step === 2 && (
                <button 
                  className='finishBtn' 
                  onClick={createUser}>
                  Criar Conta
                </button>
              )}

            </RegisterControl>
            <LogLink>tem uma conta? <span><Regislink to={"/login"} >conecte-se</Regislink></span></LogLink>
          </RegisterForm>
        </RegisterContainer>
      </BackgroundRegisterContainer>
    </>
  )
}

export default Register