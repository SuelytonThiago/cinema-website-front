import { Link } from "react-router-dom";
import styled from "styled-components";

//---------------navbar-styles-----------------

export const NavbarContainer = styled.div`
    background-color:${(props) => props.theme.container};
    display: flex;
    justify-content: center;
    align-items: center;
    padding:1rem;
    border-bottom: ${(props) => props.theme.border};
`

export const Logo = styled(Link)`
    color: ${(props) => props.theme.fontColor};


    @media screen and (max-width: 425px){
        font-size: 25px;
    }
`

export const NavbarInfo = styled.div` 
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: 1100px;

    a {
        opacity: 1;
    }

    ul {
        display: flex;
        gap: 1rem;
    };
    
`

export const NavbarLinks = styled.ul`
   display: flex;
   align-items: center; 
   justify-content: center;
`

export const MoviesLink = styled.li`

    @media screen and (max-width: 768px){
        display: none;
    }

`

//---------------menu-styles-----------------

export const MenuContainer = styled.div`
    position: relative;
    display: inline-block;

`

export const MenuButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #Fff;
    display: flex;
    gap: 10px;
    align-items: center;
    max-width: 120px;

    p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        @media screen and (max-width: 425px){
            display: none;
        }
    }

    img {
        width: 40px;
        height: 40px;
        clip-path: circle();
        background-color: #Fff;
    }
    
`

export const MenuItems = styled.ul`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 4.3rem;
    right: -15px;
    z-index: 2000;
    background-color: ${(props) => props.theme.mainContainer};
    padding: 1rem;
    width: 190px;
`

export const MenuItem = styled(Link)`
    display: flex;
    gap: .5rem;
    align-items: center;
    padding: .5rem;
`


export const OutBtn = styled.button`
    display: flex;
    align-items: center;
    background-color: transparent;
    color: ${(props) => props.theme.fontColor};
    border: none;
    cursor: pointer;
    font-weight: bold;
    opacity: .8;
    font-size: 15px;
    transition: .3s;
    gap: .5rem;
    padding: .5rem;

    &:hover {
        opacity: 1;
    }
`

export const MenuBtn = styled.button`
    background-color: transparent;
    font-size: 20px;
    color: ${(props) => props.theme.fontColor};
    border: none;
    cursor: pointer;
`

export const MenuBtnLi = styled.li`
    display: flex;
    gap: .5rem;
    align-items: center;
    padding: .5rem;
    cursor: pointer;
`

export const NavbarLinksContainer = styled.div`
    @media screen and (max-width: 630px){
        display: none;
    }
`

export const MenuResponsive = styled.div`
    display: none;

    @media screen and (max-width: 630px){
        display: block;
    }
`





