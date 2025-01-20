import React from 'react'
import { AiFillEye, AiFillEyeInvisible, AiOutlineCheck } from 'react-icons/ai';
import { useState } from 'react';
import isValidPassword from '../../js/passwordValidation';
import './CreatePasswordProfile.css'
import { useCreateNewPasswordMutate } from '../../hooks/UseCreateNewPasswordMutate';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

const CreatePasswordProfile = ({ handleShowWindow }) => {



    const [oldPassword, setOldPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [newPassword, setNewPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [show, setShow] = useState(false);
    const { mutate: createPass } = useCreateNewPasswordMutate();

    const handleTogglePassword = (e) => {
        e.preventDefault();
        setShow(!show);
    }

    const validate = () => {
        const errors = {}

        if (!isValidPassword(newPassword)) {
            errors.newPassword = 'a senha deve conter 8 caracteres incluindo letras e números';
        }

        if (newPassword !== confirm) {
            errors.confirm = 'as senhas não coincidem';
        }

        if (!confirm) {
            errors.confirm = 'não pode ficar em branco';
        }

        if (!oldPassword) {
            errors.oldPassword = 'não pode ficar em branco';
        }

        return errors;
    }

    const handleChangeUserData = () => {
        const err = validate();
        setErrors(err);

        if (Object.keys(errors).length === 0) {
            createPass({ oldPassword, newPassword }, {
                onSuccess: () => {
                    handleShowWindow();
                },
                onError: () => {
                    toast.error('Algo deu errado');
                    handleShowWindow();
                },
            }
            );

        }
    }



    return (
        <div>
            <div className='overlay'></div>
            
            <div className='createNewPassContainer'>
                <h1>Atualizar senha</h1>
                <div className={'createFormControl'}>
                    <div className={`createPasswordInput ${errors.oldPassword ? "createPasswordInputError" : ""}`}>
                        <input
                            type={show ? 'text' : 'password'}
                            placeholder="* Digite sua antiga senha"
                            id="password"
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <button onClick={(e) => handleTogglePassword(e)}>
                            {show ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                        </button>
                    </div>
                    <div className='errorCreatePassMessage'>{errors.oldPassword}</div>
                </div>
                <div className={'createFormControl'}>
                    <div className={`createPasswordInput ${errors.newPassword ? "createPasswordInputError" : ""}`}>
                        <input
                            type={show ? 'text' : 'password'}
                            placeholder="* Digite uma nova senha"
                            id="password"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button onClick={(e) => handleTogglePassword(e)}>
                            {show ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                        </button>
                    </div>
                    <div className="filterCreatePassword">
                        <p>Sua senha precisa atender aos seguintes critérios:</p>
                        <p><AiOutlineCheck className={/[A-Z]/.test(newPassword) ? 'checked' : ''} /> Mínimo uma letra maiúscula *</p>
                        <p><AiOutlineCheck className={/[a-z]/.test(newPassword) ? 'checked' : ''} /> Mínimo uma letra  minuscula*</p>
                        <p><AiOutlineCheck className={/[0-9]/.test(newPassword) ? 'checked' : ''} /> Mínimo um número *</p>
                        <p><AiOutlineCheck className={newPassword.length >= 8 ? 'checked' : ''} /> Mínimo de 8 caracteres *</p>
                    </div>
                </div>

                <div className={'createFormControl'}>
                    <div className={`createPasswordInput ${errors.confirm ? "createPasswordInputError" : ""}`}>
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
                    <div className='errorCreatePassMessage'>{errors.confirm}</div>
                </div>
                <div className='createPassowrdBtn'>
                    <button onClick={handleShowWindow}>Cancelar</button>
                    <button onClick={handleChangeUserData}>Salvar</button>
                </div>

            </div>
        </div>
    )
}


export default CreatePasswordProfile