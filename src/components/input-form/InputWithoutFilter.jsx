import React, { useState } from 'react'
import { ErrorInput, Input } from '../Input';
import { EyesButton } from '../Button';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import './Input.css'
import { MessageError } from '../Paragraph';

const InputWithoutFilter = ({ handleChange, error, nameInput }) => {

  const [show, setShow] = useState(false);
  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div>
      <div className='createPasswordInput'>
        {error ? (
          <ErrorInput
            type={show ? 'text' : 'password'}
            placeholder="* Digite uma nova senha"
            id={nameInput}
            name={nameInput}
            onChange={handleChange}
          />) : (
          <Input
            type={show ? 'text' : 'password'}
            placeholder="* Digite uma nova senha"
            id={nameInput}
            name={nameInput}
            onChange={handleChange}
          />)

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