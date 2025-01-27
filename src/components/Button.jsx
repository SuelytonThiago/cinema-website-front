import styled from 'styled-components'

export const Button = styled.button`   
    padding: .5rem 1rem;
    background-color: #1877F2;
    color: #fff;
    border: 1px solid #17191f;
    cursor: pointer;
    transition: .2s;
    border-radius: 5px;
    

    &:hover {

        background-color: #fff;
        color: #17191f;
        border: 1px solid #17191f;
    
    }
`

export const EyesButton = styled.button`
    position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
        color: #17191f;

`

export const NextButton = styled.button`
    padding: .5rem 1rem;
    border-radius: 10px;
    cursor: pointer;
    transition: .2s;
    font-weight: bold;
    opacity: .8;
    background-color: #17191f;
    border: none;
    color: #fff;

    &:hover {
        opacity: 1;
    }

`

export const ThemeBtn = styled.button`
padding: .5rem; 
   font-size: 20px;
   clip-path: circle(50%);
   border-radius: 50%;  
   width: 40px;  
   height: 40px;  
   background-color: transparent;
   color: #fff;
   border: 2px solid #fff;
   opacity: .8;
   cursor: pointer;
   transition: .2s;

   &:hover {
        opacity: 1;
        color:#000;
        background-color: #fff;
        border: 2px solid #000;
   }

`
