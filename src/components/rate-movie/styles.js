import styled from "styled-components";
import { FaUser, FaStar, FaRegStar } from 'react-icons/fa';

export const UserAvaliationContainer = styled.div`
    margin-bottom: .5rem;
    background-color: ${(props) => props.theme.mainContainer};
    height: 150px;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
`


export const UserAvaliationControl = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    
   
`

export const UserImgIcon = `
    border-radius: 50%;
    font-size: 40px;
    width: 50px;
    height: 50px;
    border:1px solid #000;
`

export const UserIcon = styled(FaUser)`
    ${UserImgIcon};
    background-color: #fff;
    color: #000;
    
`

export const UserImg = styled.img`
    ${UserImgIcon};
`

export const UserNameContainer = styled.p`
    font-weight: bold;
    ${(props) => props.theme.fontColor};
    text-transform: uppercase;
`

export const StarIcon = `
    color: #FFD700;
    font-size: 20px;
    transition: .3s;
`

export const Star = styled(FaStar)`
    ${StarIcon};
`

export const HalfStar = styled(FaRegStar)`
    ${StarIcon};
`

export const RatingButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`

export const CommentUserForm = styled.form` 
    padding: .5rem 0;
    color: ${(props) => props.theme.fontColor};
    display: flex;
    align-items: center;
    gap: .5rem;
    max-width: 300px;
    
    @media screen and (max-width: 425px){
        flex-direction: column;
    }

`


export const EditBtn = styled.button`
    width: 30px;
    height: 33px;
    cursor: pointer;
    border: none;
    transition: .3s;
    clip-path: circle();
    background-color:transparent;
    color: #Fff;
    background-color: #1877F2;
    opacity: .9;
    transition:.2s;

    &:hover{
        opacity: 1;
    }
`

export const UserAvaliatonForm = styled.div `
    width: 400px;
`


