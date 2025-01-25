import React from 'react'
import { Input, ErrorInput } from '../Input'
import './Input.css'
import { MessageError } from '../Paragraph'

const InputText = ({ error, handleChange, nameInput, value, placeholder }) => {
    return (
        <div>
            {error ? (
                <ErrorInput
                    type="text"
                    id={nameInput}
                    name={nameInput}
                    value={value || ''}
                    onChange={handleChange}
                    autoComplete='off'
                    placeholder={placeholder} />
            ) : (
                <Input
                    type="text"
                    id={nameInput}
                    name={nameInput}
                    value={value || ''}
                    onChange={handleChange}
                    autoComplete='off' 
                    placeholder={placeholder} />

            )}

            <MessageError>{error}</MessageError>
        </div>
    )
}

export default InputText