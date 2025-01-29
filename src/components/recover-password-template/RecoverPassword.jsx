import React, { useState } from 'react'
import isValidEmail from '../../js/emailValidation';
import backend from '../../../api/index'
import Cookies from 'js-cookie'
import InputText from '../input-form/InputText.jsx';
import useForm from '../../hooks/UseForm.jsx';
import { ControlRecoverContainer, RecoverContainer } from './styles.js';
import { TitleH1 } from '../Title.js';
import { BackButtonLink, NextButton } from '../Button.js';
import { toast } from 'react-toastify';


const RecoverPassword = ({ goNext }) => {

    const [errorEmail, setErrorEmail] = useState("");

    const initialFormData = {
        email: '',
    }

    const {formData, handleChange } = useForm(initialFormData)

    const validateEmail = () => {

        let error = '';

        if (!isValidEmail(formData.email)) {
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
                const response = await backend.recoverAPI.recoverPassword(formData.email)
                Cookies.set('recoveryEmail', response.data);
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
                handleChange={handleChange}  
                nameInput={'email'}
                value={formData.email}/>

            <ControlRecoverContainer>
                <BackButtonLink to={"/login"} className='bbutton'>Voltar</BackButtonLink>
                <NextButton onClick={handleChangePassword}>Proximo</NextButton>
            </ControlRecoverContainer>
        </RecoverContainer>

    )
}

export default RecoverPassword