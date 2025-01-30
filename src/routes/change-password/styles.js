import styled from "styled-components";

export const BackgroundChangeContainer = styled.div`
    background-image: url('https://minhas-imagens-2025.s3.sa-east-1.amazonaws.com/background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    align-items: center;
    height: 100vh;
    display: flex;
    justify-content: center;
`

export const ChangeContainer = styled.div `
    background-color: ${(props) => props.theme.mainContainer};
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 700px;
    padding: 5rem; 
    color: ${(props) => props.theme.fontColor};
    gap: 2rem;
`

export const CrossBtn = styled.button `
    color: #fff;
`



