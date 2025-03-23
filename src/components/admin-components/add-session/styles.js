import styled from "styled-components";


export const Form = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 5px; 
`

export const InputContainer = styled.div`
    display: flex;
    justify-content: space-around;
    
`

export const InputDate = styled.input`
    width: 100px; 
    padding: .3rem;
    width: 130px; 
    cursor: pointer;

    &:focus {
        outline: none;
        box-shadow: none;
        border:1px solid #1877F2;   
    }

    &.error {
        border: 1px solid red;
    }
 
`