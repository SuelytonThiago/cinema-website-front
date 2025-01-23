import styled from 'styled-components'

export const Button = styled.button`   
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

export const EyesButton = styled.button`
    position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
        color: #17191f;

`

export const NextButton = styled.button`
    padding: .5rem 1rem;
    border-radius: 10px;
    cursor: pointer;
    transition: .2s;
    font-weight: bold;
    opacity: .8;
    background-color: #17191f;
    border: none;
    color: #fff;

    &:hover {
        opacity: 1;
    }

`
