import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isValidEmail from '../../js/emailValidation';
import VerifyCode from '../../components/verify-code-template/VerifyCode';
import RecoverPassword from '../../components/recover-password-template/RecoverPassword.jsx';
import ChangePasswordTemplate from '../../components/change-password-template/ChangePasswordTemplate.jsx';
import './ChangePassword.css'

const ChangePassword = () => {


    return (
        <div className='backgroundChangeContainer'>
            <div className='ChangeContainer'>
                <VerifyCode/>
            </div>
        </div>
    )
}

export default ChangePassword