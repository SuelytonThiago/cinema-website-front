import React, { useState } from 'react'
import isValidName from '../../js/nameValidation';
import CreatePasswordProfile from './../change-password-profile/CreatePasswordProfile';
import { useUserDataMutation } from '../../hooks/UseUserDataMutate';
import InputMask from 'react-input-mask'
import './MyUserData.css'
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/user/actions';
import { EyesButton } from '../Button';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const MyUserData = ({ formData, handleChange }) => {

    const [dataErrors, setDataErrors] = useState('');
    const [password, setPassword] = useState('');
    const [showChangePassWindow, setShowChangePassWindow] = useState(false);

    const { mutate: userMutation } = useUserDataMutation();
    const dispatch = useDispatch();

    const handleShowWindow = () => {
        setShowChangePassWindow(!showChangePassWindow);
    }

    const [show, setShow] = useState(false);
    const handleTogglePassword = (e) => {
        e.preventDefault();
        setShow(!show);
    };


    const validate = () => {
        const errors = {}
        if (!formData.contactNumber) {
            errors.contactNumber = 'insira um numero de telefone válido'
        }
        if (!isValidName(formData.name)) {
            errors.name = 'insira um nome válido';
        }
        if (!password) {
            errors.password = 'insira a sua senha'
        }

        return errors;
    }

    const handleChangeUserData = () => {
        const err = validate()
        setDataErrors(err);
        if (Object.keys(err).length === 0) {
            console.log("clicou")
            userMutation({ formData, password }, {
                onSuccess: () => {
                    dispatch(updateUser(formData))
                },
                onError: () => {
                    toast.error('Algo deu errado');
                },
            }
            );
        }
    }
    return (

        <div className='UserDataForm'>
            <h3>Dados Pessoais</h3>
            <div className='UserFormControl'>

                <div className={`UserFormInput ${dataErrors.name ? 'error' : ''}`}>
                    <label htmlFor="name" >
                        <span style={{ color: dataErrors.name ? 'red' : '#4a4a4a' }}>
                            {dataErrors.name ? dataErrors.name : 'Name *'}
                        </span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className='UserFormInput disabledInput'>
                    <label htmlFor="email">Email *</label>
                    <input
                        type="text"
                        id="email"
                        name='email'
                        value={formData.email}
                        disabled />
                </div>
                <div className='UserFormInput disabledInput'>
                    <label htmlFor="cpf">CPF *</label>
                    <input
                        type="text"
                        id="cpf"
                        name='cpf'
                        value={formData.cpf}
                        onChange={handleChange}
                        disabled />
                </div>
                <div className={`UserFormInput ${dataErrors.contactNumber ? 'error' : ''}`}>
                    <label htmlFor="contactNumber">
                        <span style={{ color: dataErrors.contactNumber ? 'red' : '#4a4a4a' }}>
                            {dataErrors.contactNumber ? dataErrors.contactNumber : 'Telefone *'}
                        </span>
                    </label>
                    <InputMask
                        mask='(99)99999-9999'
                        value={formData.contactNumber}
                        name='contactNumber'
                        id="contactNumber"
                        onChange={handleChange}

                    />
                </div>
                <div className='passwordInputContainer'>
                    <div className='UserFormInput disabledInput'>
                        <label htmlFor="senha">Senha *</label>
                        <input
                            type="password"
                            id="password"
                            disabled
                            value='***********' />
                    </div>
                    <button className='changePassBtn' onClick={handleShowWindow}>alterar senha</button>

                </div>

            </div>
            <div className='UserDataSubmit'>
                <h3>Salvar todas as alterações</h3>
                <p>Por questões de segurança, você precisa digitar sua senha para confirmar as alterações feitas no seu cadastro.</p>
                <div className='UserFormSubmitControl'>
                    <div className={`UserFormSubmit ${dataErrors.password ? 'error' : ''}`}>
                        <label htmlFor="senha">
                            <span style={{ color: dataErrors.password ? 'red' : '#4a4a4a' }}>
                                Senha *
                            </span>
                        </label>
                        <div className='verifyPassInput'>
                            <input
                                type={show ? 'text' : 'password'}
                                id="verifyPassword"
                                onChange={(e) => setPassword(e.target.value)} />
                            <EyesButton onClick={(e) => handleTogglePassword(e)}>
                                {show ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                            </EyesButton>
                        </div>
                    </div>
                    <button onClick={handleChangeUserData}>Salvar</button>
                </div>
            </div>
            {showChangePassWindow && (
                <CreatePasswordProfile handleShowWindow={handleShowWindow} />
            )}

        </div>

    )
}

export default MyUserData