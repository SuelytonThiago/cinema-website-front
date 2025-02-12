import React, { useState } from 'react'
import isValidEmail from '../../js/emailValidation';
import backend from '../../../api/index'
import InputText from '../input-form/InputText.jsx';
import { ControlRecoverContainer, RecoverContainer } from './styles.js';
import { TitleH1 } from '../Title.js';
import { BackButtonLink, NextButton } from '../Button.js';
import { toast } from 'react-toastify';

import { useEmailContext } from '../../hooks/UseEmailContext.jsx';


const RecoverPassword = ({ goNext }) => {

    const [errorEmail, setErrorEmail] = useState("");

    const {email, setEmail} = useEmailContext();

    const validateEmail = () => {

        let error = '';

        if (!isValidEmail(email)) {
            error = 'insira um email válido';
        }

        return error;
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        var err = validateEmail();
        setErrorEmail(err);
        
        if (!err) {
            try {
                const response = await backend.recoverAPI.recoverPassword(email)
                goNext();
            } catch (err) {
                toast.error('erro ao enviar email, tente novamente mais tarde');   
            }
        }
    }



    return (
        <RecoverContainer>
            <TitleH1>CINEMAX</TitleH1>

            <h2>Esqueceu sua senha?</h2>
            <p>Informe seu endereço de e-mail ou CPF que, caso exista uma conta cadastrada, enviaremos um e-mail para recuperar sua senha.</p>
            <InputText 
                error= {errorEmail} 
                handleChange={(e) => setEmail(e.target.value)}  
                nameInput={'email'}
                value={email}/>

            <ControlRecoverContainer>
                <BackButtonLink to={"/login"} className='bbutton'>Voltar</BackButtonLink>
                <NextButton onClick={handleChangePassword}>Proximo</NextButton>
            </ControlRecoverContainer>
        </RecoverContainer>

    )
}

export default RecoverPassword