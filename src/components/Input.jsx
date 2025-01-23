import styled from 'styled-components'

export const Input = styled.input`   
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
    }
`

export const ErrorInput = styled.input`
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
`

export const InputSubit = styled.input`
    padding: .5rem 1rem;
    background-color: #1877F2;
    color: #fff;
    border: 1px solid #17191f;
    cursor: pointer;
    transition: .2s;
    border-radius: 5px;
    

    &:hover {

        background-color: #fff;
        color: #17191f;
        border: 1px solid #17191f;
    
    }
`