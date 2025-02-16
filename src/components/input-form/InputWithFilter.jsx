import React, { useState } from 'react'
import { ErrorInput, Input } from '../Input.js';
import { EyesButton } from '../Button.js';
import { AiFillEye, AiFillEyeInvisible, AiOutlineCheck } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';


const InputWithFilter = ({ handleChange, error, newPassword, style}) => {
    

    const { t } = useTranslation();

    const [show, setShow] = useState(false);
    const handleTogglePassword = (e) => {
        e.preventDefault();
        setShow(!show);
    };

    return (
        <div>
            <div style={{position: 'relative'}}>
                {error ? (
                    <ErrorInput
                        style = {style}
                        type={show ? 'text' : 'password'}
                        placeholder={t('placeholder-senha-nova')}
                        id="newPassword"
                        name="newPassword"
                        onChange={handleChange}
                        autocomplete="current-password" 
                    />
                ) : (
                    <Input
                        style = {style}
                        type={show ? 'text' : 'password'}
                        placeholder={t('placeholder-senha-nova')}
                        id="newPassword"
                        name="newPassword"
                        onChange={handleChange}
                        autocomplete="current-password" 
                    />
                )}
                <EyesButton onClick={(e) => handleTogglePassword(e)}>
                    {show ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                </EyesButton>
            </div>
            <div>
                <p>{t('criterios')}</p>
                <p><AiOutlineCheck style={{color: /[A-Z]/.test(newPassword) ? '#0ee04d' : '#ccc'}} /> {t('maiuscula')}</p>
                <p><AiOutlineCheck style={{color: /[a-z]/.test(newPassword) ? '#0ee04d' : '#ccc'}} /> {t('minuscula')}</p>
                <p><AiOutlineCheck style={{color: /[0-9]/.test(newPassword) ? '#0ee04d' : '#ccc'}} /> {t('numero')}</p>
                <p><AiOutlineCheck style={{color: newPassword.length >= 8 ? '#0ee04d' : '#ccc'}} /> {t('caracteres')}</p>
            </div>
        </div>
    )
}

export default InputWithFilter