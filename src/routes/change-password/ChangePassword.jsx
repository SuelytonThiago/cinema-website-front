import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VerifyCode from '../../components/verify-code-template/VerifyCode';
import RecoverPassword from '../../components/recover-password-template/RecoverPassword.jsx';
import ChangePasswordTemplate from '../../components/change-password-template/ChangePasswordTemplate.jsx';
import './ChangePassword.css'
import { AiOutlineClose } from 'react-icons/ai';

const ChangePassword = () => {

    const [showRecoverPassword, setShowRecoverPassword] = useState(true);
    const [showVerifyCode, setShowVerifyCode] = useState(false);
    const [showChangePasswordTemplate, setShowChangePasswordTemplate] = useState(false);

    const steps = [
        <RecoverPassword key="step1" />,
        <VerifyCode key="step2" />,
        <ChangePasswordTemplate key="step3" />,
    ];

    const [currentStep, setCurrentStep] = useState(0);

    const goNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const goBack = (stepNumber) => {
        if (stepNumber >= 0 && stepNumber < steps.length) {
            setCurrentStep(stepNumber);
        }
    };



    return (
        <div className='backgroundChangeContainer'>
            <button class="crossBtn"> <Link to={'/'}><AiOutlineClose /></Link></button>
            <div className='ChangeContainer'>
                {React.cloneElement(steps[currentStep], { goNext, goBack })}
            </div>
        </div>
    )
}

export default ChangePassword