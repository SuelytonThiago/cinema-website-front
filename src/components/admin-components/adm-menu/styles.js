import styled from "styled-components";

export const AdmBtn = styled.button`
    background-color: transparent;
    color: ${(props) => props.theme.fontColor};
    cursor: pointer;
    border: none;
`

export const Menu = styled.ul`
    position: absolute;
    z-index: 1000;
    background-color: ${(props) => props.theme.container};
    padding: .5rem;
    width: 230px;
    right: 20%;
    border-radius: 5px;
`

export const Container = styled.ul`
    position: relative;
`
export const Overlay = styled.ul`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`

export const Li = styled.li`
    padding: .5rem ;
    cursor: pointer;
    transition: .2s;
    border-radius: 25px;

    &:hover {
        background:rgba(6, 7, 8, 0.34)
    }
`