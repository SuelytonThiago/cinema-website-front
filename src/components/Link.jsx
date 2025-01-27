import { Link } from "react-router-dom";
import styled from "styled-components";


export const LinkBtn = styled(Link)`
    font-weight: bold;
    border: 1px solid #fff;
    padding: .5rem 1rem;
    border-radius: 1rem;
    opacity: 1;
    transition: .3s;

    &:hover {
        color: #17191f;
        background-color: #fff;
    }

`

export const SearchBtn = styled(Link)`
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 20px;
    color: #fff;
    background-color: transparent;
    transition: .3s;
    opacity: .7;

    &:hover {
        opacity: 1
    }
`