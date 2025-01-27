import React, { useState } from 'react'
import './RecoverPassword.css'
import { Link } from 'react-router-dom';
import isValidEmail from '../../js/emailValidation';
import backend from '../../../api/index'
import Cookies from 'js-cookie'
import { NextButton } from '../Button.jsx';
import InputText from '../input-form/InputText.jsx';
import useForm from '../../hooks/UseForm.jsx';


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
        
        if (!errorEmail) {
            console.log("clicou")
            try {
                const response = await backend.recoverAPI.recoverPassword(formData.email)
                Cookies.set('recoveryEmail', response.data);
                goNext();
            } catch (err) {
                setErrorEmail('erro ao enviar email, tente novamente mais tarde');   
            }
        }
    }



    return (
        <form className='RecoverContainer '>
            <h1 className='logo'>CINEMAX</h1>

            <h2>Esqueceu sua senha?</h2>
            <p>Informe seu endereço de e-mail ou CPF que, caso exista uma conta cadastrada, enviaremos um e-mail para recuperar sua senha.</p>
            <InputText 
            error= {errorEmail} 
            handleChange={handleChange}  
            nameInput={'email'}
            value={formData.email}/>

            <div className='controlRecoverContainer'>
                <Link to={"/login"} className='bbutton'>Voltar</Link>
                <NextButton onClick={handleChangePassword}>Proximo</NextButton>
            </div>
        </form>

    )
}

export default RecoverPassword