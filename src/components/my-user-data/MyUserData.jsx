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
import { useTranslation } from 'react-i18next';


const MyUserData = ({ formData, handleChange }) => {

    const {t} = useTranslation();

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
            errors.contactNumber = t('validacao-campo-vazio');
        }
        if (!isValidName(formData.name)) {
            errors.name = t('validacao-nome');
        }
        if (!password) {
            errors.password = t('validacao-campo-vazio');
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
                toast.error(err.response.data.Message);
            }
        }
    };

    return (
        <UserDataForm>
            <h3>{t('h3-dados-pessoais')}</h3>
            <UserFormControl>
                <UserFormInput $error={dataErrors.name}>
                    <label htmlFor="name">
                        <span>{dataErrors.name || t('label-nome')}</span>
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
                    <label htmlFor="email">{t('label-email')}</label>
                    <input type="text" id="email" name="email" value={formData.email} disabled />
                </UserFormInput>

                <UserFormInput $disabled>
                    <label htmlFor="cpf">{t('label-cpf')}</label>
                    <input type="text" id="cpf" name="cpf" value={formData.cpf} disabled />
                </UserFormInput>

                <UserFormInput $error={dataErrors.contactNumber}>
                    <label htmlFor="contactNumber">
                        <span>{dataErrors.contactNumber || t('label-telefone')}</span>
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
                        <label htmlFor="senha">{t('label-senha')}</label>
                        <input type="password" id="password" disabled value="***********" />
                    </UserFormInput>
                    <button style={{width: '150px'}} onClick={handleShowWindow}>{t('alterar-senha')}</button>
                </PasswordInputContainer>
            </UserFormControl>

            <UserDataSubmit>
                <h3>{t('h3-salvar-alteracoes')}</h3>
                <p>{t('p-insira-sua-senha')}</p>
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
                    <Button onClick={handleChangeUserData}>{t('botao-salvar')}</Button>
                </UserFormSubmitControl>
            </UserDataSubmit>

            {showChangePassWindow && <CreatePasswordProfile handleShowWindow={handleShowWindow} />}
        </UserDataForm>
    );
};

export default MyUserData;