import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import backend from './../../../api/index'
import { GoToBackBtn, InputCode, VerifyCodeBtn, VerifyCodeContainer, VerifyInput, VerifyInputContainer } from './styles';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';

const VerifyCode = ({ goNext, goBack }) => {


  const { t } = useTranslation();

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
        <h1>{t('h1-autenticacao-de-acesso')}</h1>
        <p>{t('p-informe-seu-codigo')}</p>
        <h3>{email}</h3>
        <VerifyInputContainer>
          <h5>{t('h5-informe-seu-codigo')}</h5>
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
          <VerifyCodeBtn onClick={handleVerifyCode}>{t('validar-meu-codigo')}</VerifyCodeBtn>
        </VerifyInputContainer>
        <p>{t('nao-recebeu-o-codigo')}{' '}
          <span>
            <GoToBackBtn onClick={() => goBack(0)}>{t('reeviar-por-email')}</GoToBackBtn>
          </span>
        </p>
      </VerifyCodeContainer>
    </div>
  )
}

export default VerifyCode