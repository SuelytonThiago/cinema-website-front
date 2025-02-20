import React from 'react'
import { Input, ErrorInput } from '../Input.js'
import { MessageError } from '../Paragraph.js'

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