
import React from 'react'
import { useState } from 'react';
import isValidPassword from '../../js/passwordValidation';
import { Button } from '../Button';
import backend from '../../../api/index'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'
import InputWithFilter from '../input-form/InputWithFilter';
import InputWithoutFilter from '../input-form/InputWithoutFilter';

import useForm from '../../hooks/UseForm';
import { ControlBtn, CreateNewPassContainer } from './CreatePasswordProfile';

const CreatePasswordProfile = ({ handleShowWindow }) => {
    const [errors, setErrors] = useState({});

    const initialFormData = {
        oldPassword: "",
        newPassword: "",
        confirm: "",
    }

    const { formData, handleChange } = useForm(initialFormData)

    const validate = () => {
        const errors = {}

        if (!isValidPassword(formData.newPassword)) {
            errors.newPassword = 'a senha deve conter 8 caracteres incluindo letras e números';
        }

        if (formData.newPassword !== formData.confirm) {
            errors.confirm = 'as senhas não coincidem';
        }

        if (!formData.confirm) {
            errors.confirm = 'não pode ficar em branco';
        }

        if (!formData.oldPassword) {
            errors.oldPassword = 'não pode ficar em branco';
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
            <div className='overlay'></div>

            <CreateNewPassContainer onSubmit={handleChangePassword} className='createNewPassContainer'>
                <h1>Atualizar senha</h1>
                <InputWithoutFilter 
                    handleChange={handleChange} 
                    error={errors.oldPassword} 
                    nameInput={"oldPassword"}
                    placeholder={"* Digite a sua antiga senha"} />

                <InputWithFilter 
                    handleChange={handleChange} 
                    error={errors.newPassword} 
                    newPassword={formData.newPassword} />

                <InputWithoutFilter 
                    handleChange={handleChange} 
                    error={errors.confirm} 
                    nameInput={"confirm"}
                    placeholder={"* Confirme a senha"} />

                <ControlBtn >
                    <Button onClick={handleShowWindow}>Cancelar</Button>
                    <Button type='submit'>Salvar</Button>
                </ControlBtn>
            </CreateNewPassContainer>
        </div>
    )
}


export default CreatePasswordProfile
