import styled from "styled-components";
import { FaUser, FaStar, FaRegStar } from 'react-icons/fa';

export const UserAvaliationContainer = styled.div`
    margin-bottom: .5rem;
    background-color: #17191f;
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
    min-width: 600px; /* Limita a largura máxima */
   
`

export const UserImgIcon = `
    background-color: #fff;
    color: #000;
    border-radius: 50%;
    font-size: 40px;
    width: 50px;
    height: 50px;
`

export const UserIcon = styled(FaUser)`
    ${UserImgIcon};
    
`

export const UserImg = styled.img`
    ${UserImgIcon};
`

export const UserNameContainer = styled.p`
    font-weight: bold;
    color: #fff;
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
    color: #fff;
    display: flex;
    align-items: center;
    gap: .5rem;
    
`


export const EditBtn = styled.button`
    width: 30px;
    height: 33px;
    cursor: pointer;
    border: none;
    transition: .3s;

    &:hover{
        background-color: #000;
        color: #Fff;
    }
`

export const UserAvaliatonForm = styled.div `
    width: 400px;
`


