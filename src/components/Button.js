import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Button = styled.button`   
    padding: .5rem 1rem;
    background-color:#1877F2;
    color: #fff;
    cursor: pointer;
    transition: .2s;
    border-radius: 5px;
    border: none;

    &:hover {
        background-color: #0d63d3;
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

    @media screen and (max-width: 425px){
        right: 40px;
    }

`

export const BaseBackButton = `
    padding: .5rem 1rem;
    border-radius: 10px;
    cursor: pointer;
    transition: .2s;
    font-weight: bold;
    opacity: .8;
    background-color: #1877F2;
    color: #fff;

    &:hover {
        opacity: 1;
    }
`

export const BackButton = styled.button`
    ${BaseBackButton}
`

export const BackButtonLink = styled(Link)`
    ${BaseBackButton}
`

export const NextButton = styled.button`
    padding: .5rem 1rem;
    border-radius: 10px;
    cursor: pointer;
    transition: .2s;
    font-weight: bold;
    opacity: .8;
    background-color: #1877F2;
    border: none;
    color: #fff;

    &:hover {
        opacity: 1;
    }

`

export const CrossBtn = styled(Link)`
   position: absolute;
   top: 0;
   right: 0;
   margin: 3rem 5rem;
   background-color: transparent;
   color: #fff;
   border: none;
   padding: .5rem;
   font-weight: bold;
   font-size: 30px;
   cursor: pointer;
   transition: .3s;
   opacity: .7;

    &:hover {
        opacity: 1;
    }

`
