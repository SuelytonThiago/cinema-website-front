import styled from "styled-components";

export const BackgroundRegisterContainer = styled.div` 
   background-image: url('https://minhas-imagens-2025.s3.sa-east-1.amazonaws.com/background.jpg');
   background-size: cover;
   background-position: center;
   background-repeat: no-repeat;
   min-height: 100vh;
   display: flex;
   
`

export const RegisterContainer = styled.div`
   position: relative;
   background-color: ${(props) => props.theme.container};
   padding: 2rem;
   margin: 2rem    auto;
   border-radius: 10px;
   display:flex;
   gap: 1rem;
   width: 600px;
   flex-direction: column;
   align-self: center;

   @media screen and (max-width: 768px){
      width: 100vw;
      height: 100vh;
      margin: 0 auto;
      border-radius: 0;
   }

   @media screen and (max-width: 476px){
      padding: 0.5rem;
   }
`

export const RegisterForm = styled.div`
   display: flex;
   flex-direction: column;
   flex-grow: 3;
   margin: 0 auto;
   height: 600px;
   width: 100%;
   justify-content: space-around;

   @media screen and (max-width: 768px){
      width: 90%;
   }


`

export const RegisterFormControl = styled.div`
   display: flex;
   flex-direction: column;
   gap: .5rem;
`

export const RegisterControl = styled.div`
   display: flex;
   justify-content: space-around;
   padding: 1rem;

   button {
      padding: .5rem 1rem;
      transition: .2s;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      color: #fff;
      background-color: #1877F2;

      &:hover {
         background-color: #696969;
         color: #fff;
      }

      &.finishBtn:hover{
         background-color: #FFD700;
         color: #000;
      }

      &.stepBtn:hover {
         background-color: #696969;
      }
   }
`

export const LogLink = styled.p`
   text-align: center;
   
   color: ${((props => props.theme.fontColor))};   
   font-size: 15px;
`







