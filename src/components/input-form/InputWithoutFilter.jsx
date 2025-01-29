import React, { useState } from 'react'
import { ErrorInput, Input } from '../Input.js';
import { EyesButton } from '../Button.js';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MessageError } from '../Paragraph.js';


const InputWithoutFilter = ({ handleChange, error, nameInput , placeholder,style }) => {

  const [show, setShow] = useState(false);
  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div>
      <div style={{position: 'relative'}}>
        {error ? (
          <ErrorInput
            type={show ? 'text' : 'password'}
            placeholder={placeholder}
            id={nameInput}
            name={nameInput}
            onChange={handleChange}
            autocomplete="current-password" 
            style = {style}/>) : (
          <Input
            type={show ? 'text' : 'password'}
            placeholder={placeholder}
            id={nameInput}
            name={nameInput}
            onChange={handleChange}
            autocomplete="current-password" 
            style = {style}/>)

        }
        <MessageError>{error}</MessageError>

        <EyesButton onClick={(e) => handleTogglePassword(e)}>
          {show ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
        </EyesButton>
      </div>
    </div>
  )
}

export default InputWithoutFilter