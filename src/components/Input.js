import styled from 'styled-components'
import InputMask from 'react-input-mask';

export const BaseInputStyles = `
    width: 100%;
    padding: 10px;
    padding-right: 40px;
    font-size: 13px;
    border-radius: 4px;
    border: none;
    border: 1px solid #ccc;

    &:focus {
        outline: none;
        box-shadow: none;
        border:1px solid #1877F2;
    }

    @media screen and (max-width: 425px){
        width: 80%;
    }
`;

export const BaseInputStylesError = `
    width: 100%;
    padding: 10px;
    padding-right: 40px;
    font-size: 13px;
    border-radius: 4px;
    border: none;
    border: 1px solid red;

    &:focus {
        outline: none;
        box-shadow: none;
    }

    @media screen and (max-width: 425px){
        width: 80%;
    }
`;

export const Input = styled.input`
    ${BaseInputStyles}
`;

export const InputWithMask = styled(InputMask)`
    ${BaseInputStyles}
`;

export const ErrorInput = styled.input`
    ${BaseInputStylesError}
`;

export const InputMaskError = styled(InputMask)`
    ${BaseInputStylesError}
`;

export const InputSubit = styled.input`
    padding: .5rem;
    background-color: #1877F2;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: .2s;
    border-radius: 5px;
    width: 200px;
    margin: 0 auto;

    &:hover {
        background-color: #fff;
        color: #17191f;
        box-shadow: inset 0 0 1px 1px ${(props) => props.theme.fontColor}
    
    }

    @media screen and (max-width: 425px){
        width: 80%;
    }
`;