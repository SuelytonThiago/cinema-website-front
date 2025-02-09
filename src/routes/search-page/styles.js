import styled from "styled-components";

export const SearchContainer = styled.div `
    background-color: ${props => props.theme.mainContainer};
    padding: 1rem;
`;

export const InputContainer = styled.div`
    display: flex;
    position: relative;

    input{
        border: none;
        border-bottom: 2px solid #555;
        margin-bottom: 2rem;
        background-color: transparent;
        padding: 8px;
        padding-right: 30px;
        width: 100%;
        font-size: 24px;
        font-weight: bold;
        opacity: .7;
        transition: .3s;
        color: ${(props) => props.theme.fontColor};

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
    color: ${(props) => props.theme.fontColor};
    background-color: transparent;
    transition: .3s;
    opacity: .7;
    position: absolute;
    right: 10px;
    top:30px;
    transform: translateY(-50%);
    padding: 8px;
    z-index: 1;

    &:hover{
        opacity: 1;
    }

`



