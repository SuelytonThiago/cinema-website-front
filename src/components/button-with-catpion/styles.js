import styled from "styled-components"

export const Container = styled.div`
    position: relative;
    
`

export const Btn = styled.button`
    position: relative;
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-size: 15px;

`

export const P = styled.p`
    position: absolute;
    background-color: ${(props) => props.theme.mainContainer};
    color: ${(props) => props.theme.fontColor};
    padding: .5rem;
    border-radius: 5px;
    z-index: 1000;
    text-align: center;
    width: 100px;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
    width: auto;
    white-space: nowrap;
`
