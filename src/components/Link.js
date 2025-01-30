import { Link } from "react-router-dom";
import styled from "styled-components";


export const LinkBtn = styled(Link)`
    font-weight: bold;
    box-shadow: inset 0 0 1px 1px ${(props) => props.theme.fontColor};
    padding: .5rem 1rem;
    border-radius: 1rem;
    opacity: 1;
    transition: .3s;
    color: ${(props) => props.theme.fontColor};

    &:hover {
        color: #17191f;
        background-color: #1877F2;
        box-shadow: none;
        color: #fff;
    }

`

export const SearchBtn = styled(Link)`
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 20px;
    color: ${(props) => props.theme.fontColor};
    background-color: transparent;
    transition: .3s;
    opacity: .7;

    &:hover {
        opacity: 1
    }
`

export const Regislink = styled(Link)`
   color: #1877F2;
   font-weight: bold;
`