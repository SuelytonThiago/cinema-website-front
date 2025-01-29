import React, { useState } from 'react'
import isValidName from '../../js/nameValidation';
import CreatePasswordProfile from './../change-password-profile/CreatePasswordProfile.jsx';
import InputMask from 'react-input-mask'
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/user/actions';
import { Button, EyesButton } from '../Button.js';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import backend from '../../../api/index'

import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import { 
    PasswordInputContainer, 
    UserDataForm, 
    UserDataSubmit, 
    UserFormControl, 
    UserFormInput, 
    UserFormSubmit, 
    UserFormSubmitControl, 
    VerifyPassInput } from './styles.js';


const MyUserData = ({ formData, handleChange }) => {
    const [dataErrors, setDataErrors] = useState('');
    const [password, setPassword] = useState('');
    const [showChangePassWindow, setShowChangePassWindow] = useState(false);

    const dispatch = useDispatch();

    const handleShowWindow = () => {
        setShowChangePassWindow(!showChangePassWindow);
    };

    const [show, setShow] = useState(false);
    const handleTogglePassword = (e) => {
        e.preventDefault();
        setShow(!show);
    };

    const validate = () => {
        const errors = {};
        if (!formData.contactNumber) {
            errors.contactNumber = 'insira um numero de telefone válido';
        }
        if (!isValidName(formData.name)) {
            errors.name = 'insira um nome válido';
        }
        if (!password) {
            errors.password = 'insira a sua senha';
        }

        return errors;
    };

    const handleChangeUserData = async () => {
        const err = validate();
        setDataErrors(err);
        if (Object.keys(err).length === 0) {
            try {
                await backend.userAPI.updateUser(password, formData, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    },
                });

                dispatch(updateUser(formData));
            } catch (err) {
                toast.error('Senha incorreta!');
            }
        }
    };

    return (
        <UserDataForm>
            <h3>Dados Pessoais</h3>
            <UserFormControl>
                <UserFormInput $error={dataErrors.name}>
                    <label htmlFor="name">
                        <span>{dataErrors.name || 'Name *'}</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </UserFormInput>

                <UserFormInput $disabled>
                    <label htmlFor="email">Email *</label>
                    <input type="text" id="email" name="email" value={formData.email} disabled />
                </UserFormInput>

                <UserFormInput $disabled>
                    <label htmlFor="cpf">CPF *</label>
                    <input type="text" id="cpf" name="cpf" value={formData.cpf} disabled />
                </UserFormInput>

                <UserFormInput $error={dataErrors.contactNumber}>
                    <label htmlFor="contactNumber">
                        <span>{dataErrors.contactNumber || 'Telefone *'}</span>
                    </label>
                    <InputMask
                        mask="(99)99999-9999"
                        value={formData.contactNumber}
                        name="contactNumber"
                        id="contactNumber"
                        onChange={handleChange}
                    />
                </UserFormInput>

                <PasswordInputContainer>
                    <UserFormInput $disabled>
                        <label htmlFor="senha">Senha *</label>
                        <input type="password" id="password" disabled value="***********" />
                    </UserFormInput>
                    <button style={{width: '150px'}} onClick={handleShowWindow}>alterar senha</button>
                </PasswordInputContainer>
            </UserFormControl>

            <UserDataSubmit>
                <h3>Salvar todas as alterações</h3>
                <p>
                    Por questões de segurança, você precisa digitar sua senha para confirmar as alterações
                    feitas no seu cadastro.
                </p>
                <UserFormSubmitControl>
                    <UserFormSubmit $error={dataErrors.password}>
                        <VerifyPassInput>
                            <input
                                type={show ? 'text' : 'password'}
                                id="verifyPassword"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <EyesButton onClick={handleTogglePassword}>
                                {show ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                            </EyesButton>
                        </VerifyPassInput>
                    </UserFormSubmit>
                    <Button onClick={handleChangeUserData}>Salvar</Button>
                </UserFormSubmitControl>
            </UserDataSubmit>

            {showChangePassWindow && <CreatePasswordProfile handleShowWindow={handleShowWindow} />}
        </UserDataForm>
    );
};

export default MyUserData;