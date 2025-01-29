import React, { useState } from 'react';
import VerifyCode from '../../components/verify-code-template/VerifyCode';
import RecoverPassword from '../../components/recover-password-template/RecoverPassword.jsx';
import ChangePasswordTemplate from '../../components/change-password-template/ChangePasswordTemplate.jsx';
import { AiOutlineClose } from 'react-icons/ai';
import { BackgroundChangeContainer, ChangeContainer } from './styles.js';
import { CrossBtn } from '../../components/Button.js';

const ChangePassword = () => {

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
        <BackgroundChangeContainer>
            <CrossBtn to={'/'}><AiOutlineClose /></CrossBtn>
            <ChangeContainer>
                {React.cloneElement(steps[currentStep], { goNext, goBack })}
            </ChangeContainer>
        </BackgroundChangeContainer>
    )
}

export default ChangePassword