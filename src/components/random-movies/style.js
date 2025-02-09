import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    background-color: ${(props) => props.theme.mainContainer};
    padding: 1rem;
    border-radius: 5px;
`

export const Carousel = styled.div`

    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    flex: none;

    &::-webkit-scrollbar {
        display: none;
    }
`

export const Arrow = `
    font-size:40px;
    font-weight: bold;  
    width: 50px;
    height: 50px;
    text-align: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: .2s;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    border-radius: 50%;
    opacity: .8;

    &:hover {
        opacity: 1;
    }
`

export const ArrowLeft = styled.button`
    ${Arrow};
    left: 10px;
    color: ${(props) => props.theme.fontColor};
    background-color:${(props) => props.theme.body};
    
`

export const ArrowRight = styled.button`
    ${Arrow};
    right: 10px;
    color: ${(props) => props.theme.fontColor};
    background-color:${(props) => props.theme.body};
`