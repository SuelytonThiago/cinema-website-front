import React from 'react'
import { AiFillEye, AiFillEyeInvisible, AiOutlineCheck } from 'react-icons/ai';
import { useState } from 'react';
import isValidPassword from '../../js/passwordValidation';
import { useNavigate } from 'react-router-dom';

import './ChangePasswordTemplate.css'
import { useChangePasswordMutate } from '../../hooks/UseChangePasswordMutate';

const ChangePasswordTemplate = () => {

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [show, setShow] = useState(false);
    const mutation = useChangePasswordMutate();

    const handleTogglePassword = (e) => {
        e.preventDefault();
        setShow(!show);
    }

    const validate = () => {
        const errors = {}

        if (!isValidPassword(password)) {
            errors.password = 'a senha deve conter 8 caracteres incluindo letras e números';
        }

        if (password !== confirm) {
            errors.confirm = 'as senhas não coincidem';
        }

        return errors;
    }

    const handleChangePassword = () => {
        const err = validate();
        setErrors(err);
        
        if(Object.keys(errors).length === 0){
            mutation.mutate({password},
                {
                    onSuccess: () => {
                        navigate('/login');
                    }
                }
            );
        }
    }



    return (
        <div>
            <div className='changePasswordContainer'>
                <h1>Atualizar senha</h1>
                <div className={errors.name ? 'inputError' : 'changeFormControl'}>
                    <div className='changePasswordInput'>
                        <input
                            type={show ? 'text' : 'password'}
                            placeholder="* Digite uma senha"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={(e) => handleTogglePassword(e)}>
                            {show ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                        </button>
                    </div>
                    {errors.password && <div className='errorMessage'>{errors.password}</div>}
                    <div className= "filterChangePassword">
                        <p>Sua senha precisa atender aos seguintes critérios:</p>
                        <p><AiOutlineCheck className={/[A-Z]/.test(password) ? 'checked' : ''} /> Mínimo uma letra maiúscula *</p>
                        <p><AiOutlineCheck className={/[a-z]/.test(password) ? 'checked' : ''} /> Mínimo uma letra  minuscula*</p>
                        <p><AiOutlineCheck className={/[0-9]/.test(password) ? 'checked' : ''} /> Mínimo um número *</p>
                        <p><AiOutlineCheck className={password.length >= 8 ? 'checked' : ''} /> Mínimo de 8 caracteres *</p>
                    </div>
                </div>

                <div className={errors.name ? 'inputError' : 'changeFormControl'}>
                    <div className='changePasswordInput'>
                        <input
                            type={show ? 'text' : 'password'}
                            placeholder='* Repita a senha'
                            id="confirmPassword"
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                        <button onClick={(e) => handleTogglePassword(e)}>
                            {show ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                        </button>
                    </div>
                    {errors.confirm && <div className='errorMessage'>{errors.confirm}</div>}
                </div>
                <div className='changePassowrdBtn'>
                    <button onClick={handleChangePassword}>Salvar</button>
                </div>
                
            </div>
        </div>
    )
}

export default ChangePasswordTemplate