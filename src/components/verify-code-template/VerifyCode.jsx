import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import backend from './../../../api/index'
import { GoToBackBtn, InputCode, VerifyCodeBtn, VerifyCodeContainer, VerifyInput, VerifyInputContainer } from './styles';

const VerifyCode = ({ goNext, goBack }) => {

  const email = Cookies.get('recoveryEmail');

  const [pins, setPins] = useState(["", "", "", "", "", ""]);

  const [invalidCode, setInvalidCode] = useState(false);


  const handleVerifyCode = async () => {
    const code = pins.join("");
    try {
      const res = await backend.recoverAPI.verifyCode(code, email);
      Cookies.set('accessToken', res.data)
      console.log(res);
      goNext()
    } catch (err) {
      setInvalidCode(true);
      toast.error(err.response.data.Message)
    }
    console.log(invalidCode);
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
      <VerifyCodeContainer>
        <h1>Autenticação de acesso via Email</h1>
        <p>Por favor informe o código de autenticação enviado para o seu email cadastrado em sua conta.</p>
        <h3>{email}</h3>
        <VerifyInputContainer>
          <h5>Informe o seu código de segurança</h5>
          <VerifyInput>
            {pins.map((pin, index) => (
              <InputCode $invalidCode={invalidCode}
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
          </VerifyInput>
          <VerifyCodeBtn onClick={handleVerifyCode}>Validar meu código</VerifyCodeBtn>
        </VerifyInputContainer>
        <p>Não recebeu o código?{' '}
          <span>
            <GoToBackBtn onClick={() => goBack(0)}> Reenviar por email </GoToBackBtn>
          </span>
        </p>
      </VerifyCodeContainer>
    </div>
  )
}

export default VerifyCode