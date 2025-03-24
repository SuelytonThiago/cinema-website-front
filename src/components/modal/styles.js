import styled from "styled-components";

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

export const ModalContainer = styled.div`
    padding: 20px;
    border-radius: 8px;
    width: 500px;
    max-width: 100%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
`


export const ModalContent = styled.div`
    max-height: 80vh;
`

export const CloseBtn = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #555;
`