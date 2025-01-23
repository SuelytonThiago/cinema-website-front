import React, { useState } from 'react'
import './Input.css'
import { ErrorInput, Input } from '../Input';
import { EyesButton } from '../Button';
import { AiFillEye, AiFillEyeInvisible, AiOutlineCheck } from 'react-icons/ai';

const InputWithFilter = ({ handleChange, error, newPassword }) => {

    const [show, setShow] = useState(false);
    const handleTogglePassword = (e) => {
        e.preventDefault();
        setShow(!show);
    };

    return (
        <div>
            <div className='createPasswordInput'>
                {error ? (
                    <ErrorInput
                        type={show ? 'text' : 'password'}
                        placeholder="* Digite uma nova senha"
                        id="newPassword"
                        name="newPassword"
                        onChange={handleChange}
                    />
                ) : (
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder="* Digite uma nova senha"
                        id="newPassword"
                        name="newPassword"
                        onChange={handleChange}
                    />
                )}
                <EyesButton onClick={(e) => handleTogglePassword(e)}>
                    {show ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                </EyesButton>
            </div>
            <div>
                <p>Sua senha precisa atender aos seguintes critérios:</p>
                <p><AiOutlineCheck className={/[A-Z]/.test(newPassword) ? 'checked' : ''} /> Mínimo uma letra maiúscula *</p>
                <p><AiOutlineCheck className={/[a-z]/.test(newPassword) ? 'checked' : ''} /> Mínimo uma letra  minuscula*</p>
                <p><AiOutlineCheck className={/[0-9]/.test(newPassword) ? 'checked' : ''} /> Mínimo um número *</p>
                <p><AiOutlineCheck className={newPassword.length >= 8 ? 'checked' : ''} /> Mínimo de 8 caracteres *</p>
            </div>
        </div>
    )
}

export default InputWithFilter