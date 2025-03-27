
import React from 'react'
import { useState } from 'react';
import isValidPassword from '../../js/passwordValidation';
import { Button } from '../Button.js';
import backend from '../../../api/index'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'
import InputWithFilter from '../input-form/InputWithFilter';
import InputWithoutFilter from '../input-form/InputWithoutFilter';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';

import useForm from '../../hooks/UseForm';
import { ControlBtn, CreateNewPassContainer } from './styles.js';
import { Overlay } from '../Overlay.js';

const CreatePasswordProfile = ({ handleShowWindow }) => {
    const { t } = useTranslation();

    const initialFormData = {
        oldPassword: "",
        newPassword: "",
        confirm: "",
    }

    const { formData, handleChange, errors, setErrors, handleOnFocus } = useForm(initialFormData);

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

        if (!formData.oldPassword) {
            errors.oldPassword =  t('validacao-campo-vazio');
        }

        return errors;
    }

    const handleChangePassword = async(e) => {
        e.preventDefault();
        const err = validate();
        setErrors(err);
        console.log(errors.confirm);

        if (Object.keys(err).length === 0) {
            try {
                await backend.userAPI.updateUserPassword(formData.oldPassword, formData.newPassword, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    }
                });

                handleShowWindow();
            } catch (err) {
                toast.error(err.response.data.Message);
            }
        }

    }

    return (
        <div>
            <Overlay></Overlay>

            <CreateNewPassContainer onSubmit={handleChangePassword} className='createNewPassContainer'>
                <h1>{t('h1-atualizar-senha')}</h1>
                <InputWithoutFilter 
                    handleChange={handleChange} 
                    handleOnFocus={handleOnFocus}
                    error={errors.oldPassword} 
                    nameInput={"oldPassword"}
                    placeholder={t('placeholder-senha-antiga')} />

                <InputWithFilter 
                    handleChange={handleChange} 
                    handleOnFocus={handleOnFocus}
                    error={errors.newPassword} 
                    newPassword={formData.newPassword} />

                <InputWithoutFilter 
                    handleChange={handleChange} 
                    handleOnFocus={handleOnFocus}
                    error={errors.confirm} 
                    nameInput={"confirm"}
                    placeholder={t('placeholder-confirmacao-senha')} />

                <ControlBtn >
                    <Button onClick={handleShowWindow}>{t('botao-cancelar')}</Button>
                    <Button type='submit'>{t('botao-salvar')}</Button>
                </ControlBtn>
            </CreateNewPassContainer>
        </div>
    )
}


export default CreatePasswordProfile
