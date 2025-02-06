import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
    0% {
        transform: scaleX(0);
    }
`

export const LoaderContainer = styled.div`
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    min-height: 70vh;
    gap:.5rem;
`

export const Logo = styled.div`
    font-size: 40px;
    font-weight: bold;
`

export const Loader = styled.div`
    position: relative;
    height: 4px;
    width:200px;
    background-color: #17191f;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #1877F2;
        transform-origin:left;
        animation: ${loadingAnimation} 3s linear infinite;
    }
`

