import styled from "styled-components";

export const VerifyCodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    p {
        text-align: center;
    }
`

export const VerifyInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`

export const InputCode = styled.input`
    width: 50px;
    height: 50px;
    font-size: 30px;
    text-align: center;
    border-radius: 5px;
    outline: none; 
    box-shadow: none;
    border: 1px solid ${(props) => props.$invalidCode ? 'red' : '#ccc'};
    
    &:focus {
        outline: none; 
        box-shadow: none;
    }
`


export const VerifyInput = styled.div `
    display: flex;
    gap: 10px;
`


export const VerifyCodeBtn = styled.button`
    background-color: #17191f;
    border: 1px solid #17191f;
    color: #fff;
    padding: 1rem;
    border: none;
    border-radius: 10px;
    transition: .2s;
    cursor: pointer;

    &:hover {
        background-color: #fff;
        color: #17191f;
        border: 1px solid #17191f;

    }
`

export const GoToBackBtn = styled.button`
    background-color: transparent;
    border: none;
    color: #1877F2;
    font-weight: bold;
    padding: .5rem;
    cursor: pointer;
    opacity: .8;
    transition: .2s;
    font-size: 15px;

    &:hover{
        opacity: 1;
    }
`