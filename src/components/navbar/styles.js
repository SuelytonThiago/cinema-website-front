import { Link } from "react-router-dom";
import styled from "styled-components";

//---------------navbar-styles-----------------

export const NavbarContainer = styled.div `
    background-color: #17191f;
    display: flex;
    justify-content: center;
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
    }
    
`

export const NavbarLinks = styled.ul`
   display: flex;
   align-items: center; 
`

//---------------menu-styles-----------------

export const MenuContainer = styled.div `
    position: relative;
    display: inline-block;

`

export const MenuButton = styled.button `
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
    top: 4rem;
    right: -15px;
    z-index: 2000;
    background-color: #000000;
    padding: 1rem;
    width: 190px;
`

export const MenuItem = styled(Link) `
    display: flex;
    gap: .5rem;
    align-items: center;
`


export const OutBtn = styled.button `
    display: flex;
    align-items: center;
    background-color: transparent;
    color: #fff;
    border: none;
    cursor: pointer;
    font-weight: bold;
    opacity: .6;
    font-size: 15px;
    transition: .3s;
    gap: .5rem;

    &:hover {
        opacity: 1;
    }
`





