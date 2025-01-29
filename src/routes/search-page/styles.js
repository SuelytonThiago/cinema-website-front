import styled from "styled-components";

export const SearchContainer = styled.div `
    background-color: ${props => props.theme.container};
`;

export const InputContainer = styled.div`
    display: flex;
    position: relative;

    input{
        border: none;
        border-bottom: 2px solid #555;
        margin-bottom: 5rem;
        background-color: transparent;
        padding: 8px;
        padding-right: 30px;
        width: 100%;
        font-size: 24px;
        font-weight: bold;
        opacity: .7;
        transition: .3s;
        color: #ccc;

        &:focus {
            border-bottom: 2px solid #555;
            background-color: transparent; 
            box-shadow: none; 
            outline: none;
            opacity: 1;
        }
    }
`

export const InputBtn = styled.button`
    border: none;
    background-color: none;
    cursor: pointer;
    font-size: 20px;
    color: #fff;
    background-color: transparent;
    transition: .3s;
    opacity: .7;
    position: absolute;
    right: 10px; /* Ajuste o valor conforme necessário para posicionar o botão corretamente */
    top: 20%; 
    transform: translateY(-50%);
    padding: 8px;
    z-index: 1;  /* Corrige o alinhamento vertical do botão */

    &:hover{
        opacity: 1;
    }

`



