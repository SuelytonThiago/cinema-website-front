import styled from "styled-components";

export const Btn = styled.button`
    padding: .5rem; 
    font-size: 20px;
    clip-path: circle(50%);
    border-radius: 50%;  
    width: 40px;  
    height: 40px;  
    background-color: transparent;
    color: ${(props) => props.theme.fontColor};
    border: none;
    cursor: pointer;
    transition: .2s;
    box-shadow: inset 0 0 1px 1px ${(props) => props.theme.fontColor};
    
    &:hover {
        background-color: #1877F2;
        box-shadow: none;
        color: #fff;
    }


`
