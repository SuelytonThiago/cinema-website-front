import { Link } from "react-router-dom";
import styled from "styled-components";

export const SigContainer = styled.div `
    display: flex;
    height: 100vh;  
    width: 100%;
    overflow: hidden;
` 
 
 
 
export const SigninContainer = styled.div `
  background-color: ${(props) => props.theme.container};
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;  
  height: 100%;  
`
 

export const BackImg = styled.div `
  flex: 1;  
  height: 100%;
  
  img {
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
  }
` 
 

export const SigninForm = styled.form` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 350px;
  flex-grow: 3;
  margin: 0 auto;
`
 
 

 export const ForgoutPass = styled(Link)`
  p {
    color: #1877F2;
    font-size: 15px;
    text-align: center;
  }
 `
 
export const RegisterLinkBtn = styled.div` 
  color: #000;
  font-size: 15px;
`



//------------menu-style-------------------

export const AuthenticationTab = styled.div`
  position: fixed;
  top: 0;
  left: 70%;
  width: 30%;
  height: 100vh;
  background-color: ${(props) => props.theme.mainContainer};
  display: flex;
  flex-direction: column;
  gap: 20rem;
  z-index: 2;
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

 