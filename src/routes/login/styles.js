import { Link } from "react-router-dom";
import styled from "styled-components";

export const SigContainer = styled.div`
    display: flex;
    height: 100vh;  
    width: 100%;
    overflow: hidden;
`



export const SigninContainer = styled.div`
  background-color: ${(props) => props.theme.container};
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;  
  height: 100%;  
  position: relative;
`


export const BackImg = styled.div`
  flex: 1;  
  height: 100%;
  
  img {
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
  }

  @media screen and (max-width: 768px){
    display: none;
  }
`


export const SigninForm = styled.form` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 1rem;
  max-width: 350px;
  flex-grow: 3;
  margin: 0 auto;
`



export const ForgoutPass = styled(Link)`
  p {
    color: #1877F2;
    font-size: 15px;
    text-align: center;
    padding-bottom: 1rem;
  }
 `

export const RegisterLinkBtn = styled.div` 
  color: #000;
  font-size: 15px;
  text-align: center;

  @media screen and (max-width: 354px){
    font-size: 13px;
  }

`
export const FormContainer = styled.div`
  display: grid;
  gap: 1rem; 
  justify-content: center;
  grid-template-columns: 1fr;
  
`


//------------menu-style-------------------

export const AuthenticationTab = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: fixed;
    top: 0;
    top: 50%;
    left: 50%;
    width: 80vw;
    height: 80vw; 
    max-width: 400px;
    max-height: 400px;
    background-color: ${(props) => props.theme.mainContainer};
    transform: translate(-50%, -50%);
    border-radius: 5px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;

  @media screen and (max-width: 760px) {
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100vh; 
    border-radius: 0; 
    transform: none;
    box-shadow: none; 
    gap: 5rem;
  }
`


export const AuthenticationTitle = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const Btn = styled.button`
  background-color: transparent;
  color: ${(props) => props.theme.fontColor};
  border: none;
  font-size: 20px;
  opacity: .7;
  transition: .3s;
  cursor: pointer;

  &:hover{
    opacity: 1;
  }
`

export const H2 = styled.h2`
  font-size: 15px;
  text-align: center;
  margin-bottom: 1rem;
`

