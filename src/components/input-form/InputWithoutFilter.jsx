import React, { useState } from 'react'
import { ErrorInput, Input } from '../Input.js';
import { EyesButton } from '../Button.js';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MessageError } from '../Paragraph.js';


const InputWithoutFilter = ({ handleChange, error, nameInput, placeholder, handleOnFocus }) => {

  const [show, setShow] = useState(false);
  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <Input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          id={nameInput}
          name={nameInput}
          onChange={handleChange}
          onFocus={handleOnFocus}
          autocomplete="current-password"
          style={{ border: `1px solid ${error ? 'red' : '#1877F2'}` }} />
        <MessageError>{error}</MessageError>

        <EyesButton onClick={(e) => handleTogglePassword(e)}>
          {show ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
        </EyesButton>
      </div>
    </div>
  )
}

export default InputWithoutFilter