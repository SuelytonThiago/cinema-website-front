import React from 'react'
import { MessageError } from '../Paragraph.js';
import { InputWithMask, InputMaskError } from '../Input.js';

const InputMaskComponent = ({ error, handleChange, nameInput, value, placeholder, mask, handleOnFocus }) => {
    return (
        <div>

            <InputWithMask
                mask={mask}
                placeholder={placeholder}
                id={nameInput}
                name={nameInput}
                value={value}
                onChange={handleChange}
                onFocus={handleOnFocus}
                style={{ border: `1px solid ${error ? 'red' : '#1877F2'}` }} />
                
            <MessageError>{error}</MessageError>
        </div >
    )
}

export default InputMaskComponent