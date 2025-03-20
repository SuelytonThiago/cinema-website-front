import React from 'react'
import { Input } from '../Input.js'
import { MessageError } from '../Paragraph.js'

const InputText = ({ error, handleChange, nameInput, value, placeholder, handleOnFocus }) => {
    return (
        <div>
            <Input
                style={{ border: `1px solid ${error ? 'red' : '#1877F2'}`}}
                type="text"
                id={nameInput}
                name={nameInput}
                value={value || ''}
                onChange={handleChange}
                onFocus={handleOnFocus}
                autoComplete='off'
                placeholder={placeholder} />

            <MessageError>{error}</MessageError>
        </div>
    )
}

export default InputText