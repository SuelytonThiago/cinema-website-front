import React from 'react'
import { MessageError } from '../Paragraph.js';
import { InputWithMask, InputMaskError } from '../Input.js';

const InputMaskComponent = ({ error, handleChange, nameInput, value, placeholder, mask, style }) => {
    return (
        <div>   
            {error ? (
            <InputMaskError
                mask={mask}
                placeholder={placeholder}
                id={nameInput}
                name={nameInput}
                value={value}
                onChange={handleChange} 
                style = {style}/>
        ) : (
            <InputWithMask
                mask={mask}
                placeholder={placeholder}
                id={nameInput}
                name={nameInput}
                value={value}
                onChange={handleChange}
                style = {style} />
        )}
            <MessageError>{error}</MessageError>
        </div >
    )
}

export default InputMaskComponent