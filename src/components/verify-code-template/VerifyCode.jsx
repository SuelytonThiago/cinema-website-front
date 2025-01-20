import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './VerifyCode.css'
import { useVerifyCodeMutate } from '../../hooks/UseVerifyCodeMutate';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const VerifyCode = ({ goNext, goBack }) => {

  const email = Cookies.get('recoveryEmail');

  const [pins, setPins] = useState(["", "", "", "", "", ""]);
  const mutation = useVerifyCodeMutate();

  const [invalidCode, setInvalidCode] = useState(false);

  const handleVerifyCode = () => {
    const code = pins.join("");
    mutation.mutate({ code, email }, {
      onSuccess: () => {
        goNext();
      },
      onError: () => {
        setInvalidCode(true);
      },
    });
  };


  const handleChange = (e, index) => {
    setInvalidCode(false);
    const value = e.target.value;

    if (!/^[0-9]$/.test(value) && value !== "") return;

    const updatedPins = [...pins];
    updatedPins[index] = value;
    setPins(updatedPins);

    if (value && index < pins.length - 1) {
      document.getElementById(`pin-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      setPins(["", "", "", "", "", ""]);
      document.getElementById("pin-0").focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text");

    if (/^\d{6}$/.test(pastedData)) {
      const updatedPins = pastedData.split("");
      setPins(updatedPins);

      document.getElementById(`pin-${updatedPins.length - 1}`).focus();
    }
  };

  return (
    <div>
      <div className='verifyCodeContainer'>
        <img src="https://minhas-imagens-2025.s3.sa-east-1.amazonaws.com/gif-email.gif" alt="email-gif" />
        <h1>Autenticação de acesso via Email</h1>
        <p>Por favor informe o código de autenticação enviado para o seu email cadastrado em sua conta.</p>
        <h3>{email}</h3>
        <div className='verifyInputContainer'>
          <h5>Informe o seu código de segurança</h5>
          <div className={`verifyInput ${invalidCode ? 'verifyInputError' : ''}`}>
            {pins.map((pin, index) => (
              <input
                key={index}
                id={`pin-${index}`}
                type="text"
                maxLength="1"
                value={pin}
                onClick={() => handleClick(index)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste} />
            ))}
          </div>
          <button onClick={handleVerifyCode} className='verifyCodeBtn'>Validar meu código</button>
        </div>
        <p>Não recebeu o código?
          <span>
            <button className='goToBackBtn' onClick={() => goBack(0)}> Reenviar por email </button>
          </span>
        </p>
      </div>
    </div>
  )
}

export default VerifyCode