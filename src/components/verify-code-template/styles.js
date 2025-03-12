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

    @media screen and (max-width: 425px){
        h1 {
            font-size: 17px;
        }
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

    @media screen and (max-width: 425px){
        width: 40px;
        height: 40px;
    }
`


export const VerifyInput = styled.div`
    display: flex;
    gap: 10px;
`


export const VerifyCodeBtn = styled.button`
    background-color: #1877F2;
    border: 1px solid #fff;
    color: #fff;
    padding: 1rem;
    border: none;
    border-radius: 10px;
    transition: .2s;
    cursor: pointer;
    opacity: .8;

    &:hover {
        opacity: 1;

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