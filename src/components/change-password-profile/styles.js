import styled from "styled-components";

export const CreateNewPassContainer = styled.form `
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: ${(props) => props.theme.mainContainer};
    transform: translate(-50%, -50%);
    z-index: 2;
    padding: 2rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const ControlBtn = styled.div`
    display: flex;
    justify-content: space-around;
`


