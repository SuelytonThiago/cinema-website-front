import React from 'react'
import InputWithMask from 'react-input-mask';
import InputMaskError from 'react-input-mask';
import './Input.css'
import { MessageError } from '../Paragraph';

const InputMaskComponent = ({ error, handleChange, nameInput, value, placeholder, mask }) => {
    return (
        <div>   {error ? (
            <InputMaskError
                mask={mask}
                placeholder={placeholder}
                id={nameInput}
                name={nameInput}
                value={value}
                onChange={handleChange} />
        ) : (
            <InputWithMask
                mask={mask}
                placeholder={placeholder}
                id={nameInput}
                name={nameInput}
                value={value}
                onChange={handleChange} />
        )}
            <MessageError>{error}</MessageError>
        </div >
    )
}

export default InputMaskComponent