import React, { useState } from 'react'
import isValidEmail from '../../js/emailValidation';
import backend from '../../../api/index'
import InputText from '../input-form/InputText.jsx';
import { ControlRecoverContainer, RecoverContainer } from './styles.js';
import { TitleH1 } from '../Title.js';
import { BackButtonLink, NextButton } from '../Button.js';
import { toast } from 'react-toastify';


import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';


const RecoverPassword = ({ goNext }) => {

    const { t } = useTranslation();

    const [errorEmail, setErrorEmail] = useState("");

    const [email, setEmail] = useState("");

    const validateEmail = () => {

        let error = '';

        if (!isValidEmail(email)) {
            error = t('validacao-email');
        }

        return error;
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        var err = validateEmail();
        setErrorEmail(err);
        
        if (!err) {
            try {
                await backend.recoverAPI.recoverPassword(email);
                localStorage.setItem('email',email);
                goNext();
            } catch (err) {
                toast.error(t('erro-enviar-email'));   
            }
        }
    }



    return (
        <RecoverContainer>
            <TitleH1>CINEMAX</TitleH1>

            <h2>{t('h2-esqueceu-senha')}</h2>
            <p>{t('p-informe-seu-email')}</p>
            <InputText 
                error= {errorEmail} 
                handleChange={(e) => setEmail(e.target.value)}  
                handleOnFocus={() => setErrorEmail('')}
                nameInput={'email'}
                value={email} />

            <ControlRecoverContainer>
                <BackButtonLink to={"/login"} className='bbutton'>{t('botao-voltar')}</BackButtonLink>
                <NextButton onClick={handleChangePassword}>{t('botao-proximo')}</NextButton>
            </ControlRecoverContainer>
        </RecoverContainer>

    )
}

export default RecoverPassword