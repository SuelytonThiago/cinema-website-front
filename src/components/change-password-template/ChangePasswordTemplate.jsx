import React from 'react'
import { useState } from 'react';
import isValidPassword from '../../js/passwordValidation';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import backend from '../../../api/index'
import { toast } from 'react-toastify';
import { InputSubit } from '../Input.js';
import InputWithFilter from '../input-form/InputWithFilter';
import InputWithoutFilter from '../input-form/InputWithoutFilter';
import useForm from '../../hooks/UseForm';
import { ChangePassowrdBtn, ChangePasswordContainer } from './styles.js';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';

const ChangePasswordTemplate = () => {

    const { t } = useTranslation();

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const initialState = {
        newPassword: '',
        confirm: ''
    }

    const { formData, handleChange } = useForm(initialState);

    const validate = () => {
        const errors = {}

        if (!isValidPassword(formData.newPassword)) {
            errors.newPassword = t('validacao-senha-invalida');
        }

        if (formData.newPassword !== formData.confirm) {
            errors.confirm = t('validacao-senhas-diferentes');
        }

        if (!formData.confirm) {
            errors.confirm = t('validacao-campo-vazio');
        }

        return errors;
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const err = validate();
        setErrors(err);

        if (Object.keys(errors).length === 0) {
            try {
                await backend.userAPI.changePassword(formData.newPassword, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    }
                })
                Cookies.remove("recoveryEmail");
                Cookies.remove("accessToken");
                Cookies.remove('recoveryEmail');
                navigate('/login');
            } catch (err) {
                toast.error(err.response.data.Message)
            }
        }
    }

    return (
        <div>
            <ChangePasswordContainer onSubmit={handleChangePassword}>
                <h1>{t('h1-atualizar-senha')}</h1>

                <InputWithFilter 
                error={errors.password} 
                handleChange={handleChange} 
                newPassword={formData.newPassword} />
                
                <InputWithoutFilter 
                error={errors.confirm} 
                handleChange={handleChange} 
                nameInput={"confirm"} 
                placeholder={t('placeholder-confirmacao-senha')} />
                
                <ChangePassowrdBtn>
                    <InputSubit type='submit' value={t('botao-salvar')} />
                </ChangePassowrdBtn>

            </ChangePasswordContainer>
        </div>
    )
}

export default ChangePasswordTemplate