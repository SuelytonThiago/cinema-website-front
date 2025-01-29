import styled from "styled-components";

export const BackgroundRegisterContainer = styled.div ` 
   background-image: url('https://minhas-imagens-2025.s3.sa-east-1.amazonaws.com/background.jpg');
   background-size: cover;
   background-position: center;
   background-repeat: no-repeat;
   min-height: 100vh;
   display: flex;
   position: relative;
`

export const RegisterContainer = styled.div `
   background-color: #17191f;
   padding: 2rem;
   margin: 2rem    auto;
   border-radius: 10px;
   display:flex;
   gap: 1rem;
   width: 600px;
   flex-direction: column;
   align-self: center;
`

export const RegisterForm = styled.div`
   display: flex;
   flex-direction: column;
   flex-grow: 3;
   margin: 0 auto;
   height: 600px;
   justify-content: space-around;
`

export const RegisterFormControl = styled.div`
   display: flex;
   flex-direction: column;
   gap: .5rem;
`

export const RegisterControl = styled.div `
   display: flex;
   justify-content: space-around;
   padding: 1rem;

   button {
      padding: .5rem 1rem;
      transition: .2s;
      border: none;
      border-radius: 25px;
      cursor: pointer;

      &:hover {
         background-color: #696969;
         color: #fff;
      }
   }
`

export const LogLink = styled.p `
   text-align: center;
   font-weight: 100;
   color: #fff;
   font-size: 15px;
`







