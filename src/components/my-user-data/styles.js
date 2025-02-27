import styled from "styled-components";

export const UserDataForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;

export const UserFormControl = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const UserFormInput = styled.div`
    width: 100%;
    padding: 0.5rem;
    border-radius: 7px;
    border: none;
    border-left: 8px solid ${(props) => (props.$error ? 'red' : '#ccc')};    
    font-size: 12px;
    background-color: ${(props) => (props.$disabled ? '#ccc' : '#fff')};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: inset 0 0 1px 1px #ccc;

    &:focus-within {
        border-left: 8px solid ${(props) => (props.$error ? 'red' : '#1877F2')};
    }

    label {
        transition: 0.2s ease all;
        color: ${(props) => (props.$error ? 'red' : '#999')};
    }

    input {
        border: none;
        outline: none;
        background-color: transparent;

        &:disabled {
            cursor: not-allowed;
        }
    }
`;

export const UserFormSubmit = styled(UserFormInput)`
    width: 250px;
    box-shadow: inset 0 0 1px 1px #ccc;

    @media screen and (max-width: 434px){
        width: 100%;
    }
    
`

export const PasswordInputContainer = styled.div`
    display: flex;
    align-items: center;
    border-radius: 7px;
    background-color: #ccc;

    button {
        background-color: transparent;
        border: none;
        color: #1877F2;
        cursor: pointer;
        font-weight: bold;
        font-size: 15px;
        transition: 0.2s;

        &:hover {
            color: #093d81;
        }
    }
`;

export const UserDataSubmit = styled.div`
    background-color: ${(props) => props.theme.mainContainer};
    padding: 2rem;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h3 {
        color: ${(props) => props.theme.fontColor};
    }

    p {
        color: ${(props) => props.theme.fontColor};
    }

    @media screen {
        
    }
`;

export const UserFormSubmitControl = styled.div`
    display: flex;
    gap: 10px;
    

    @media screen and (max-width: 434px){
        flex-direction: column;
        width: 100%;
    }
`

export const VerifyPassInput = styled.div`
    position: relative;

    input {
        height: 20px;
        width: 100%;
    }

`;

