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
import { ChangePasswordContainer } from './styles.js';

const ChangePasswordTemplate = () => {

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
            errors.newPassword = 'a senha deve conter 8 caracteres incluindo letras e números';
        }

        if (formData.newPassword !== formData.confirm) {
            errors.confirm = 'as senhas não coincidem';
        }

        if (!formData.confirm) {
            errors.confirm = 'não pode ficar em branco';
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
                toast.error("Algo de errado!")
            }
        }
    }

    return (
        <div>
            <ChangePasswordContainer onSubmit={handleChangePassword}>
                <h1>Atualizar senha</h1>

                <InputWithFilter 
                error={errors.password} 
                handleChange={handleChange} 
                newPassword={formData.newPassword} />
                
                <InputWithoutFilter 
                error={errors.confirm} 
                handleChange={handleChange} 
                nameInput={"confirm"} 
                placeholder={"* Confirme a nova senha"} />
                
                <div className='changePassowrdBtn'>
                    <InputSubit type='submit' value='Salvar' />
                </div>

            </ChangePasswordContainer>
        </div>
    )
}

export default ChangePasswordTemplate