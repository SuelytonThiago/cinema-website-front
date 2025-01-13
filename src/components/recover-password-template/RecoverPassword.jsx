import React, { useState } from 'react'
import './RecoverPassword.css'
import { Link } from 'react-router-dom';
import VerifyCode from '../../components/verify-code-template/VerifyCode.jsx'
import { useRecoverPasswordMutate } from '../../hooks/UseRecoverPasswordMutate.jsx';
import isValidEmail from '../../js/emailValidation';

const RecoverPassword = () => {

    const [errorEmail, setErrorEmail] = useState("");
    const [email, setEmail] = useState("");
    const mutation = useRecoverPasswordMutate();

    const validateEmail = () => {

        let error = '';

        if (!isValidEmail(email)) {
            error = 'insira um email válido';
        }

        return error;
    }

    const handleChangePassword = () => {
        const error = validateEmail();
        setErrorEmail(error);

        if (!errorEmail) {
            mutation.mutate(email);

        }
    }



    return (
        <div className='RecoverContainer'>
            <h1 className='logo'>CINEMAX</h1>

            <h2>Esqueceu sua senha?</h2>
            <p>Informe seu endereço de e-mail ou CPF que, caso exista uma conta cadastrada, enviaremos um e-mail para recuperar sua senha.</p>
            <div className='recoverInput'>
                <input
                    type="text"
                    id="email"
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete='off' />
            </div>
            <div className='controlRecoverContainer'>
                <Link to={"/login"} className='bbutton'>Voltar</Link>
                <button onClick={handleChangePassword} className='rbutton'>Recuperar senha</button>
            </div>
        </div>

    )
}

export default RecoverPassword