import React from 'react'
import { Input, ErrorInput } from '../Input'
import './Input.css'
import { MessageError } from '../Paragraph'

const InputText = ({ error, handleChange, nameInput }) => {
    return (
        <div>
            {error ? (
                <ErrorInput
                    type="text"
                    id="email"
                    name={nameInput}
                    onChange={handleChange}
                    autoComplete='off' />
            ) : (
                <Input
                    type="text"
                    id="email"
                    name={nameInput}
                    onChange={handleChange}
                    autoComplete='off' />

            )}

            <MessageError>{error}</MessageError>
        </div>
    )
}

export default InputText