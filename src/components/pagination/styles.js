import styled from "styled-components";


export const PaginationContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

export const ItemsResultContainer = styled.div `
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
`


export const PaginationControls = styled.div`
    display: flex;
    gap: .5rem;
    display: flex;
    justify-content: center;
    padding: 1rem;
`

export const PaginationBtn = styled.button`
    padding: .3rem;
    color: ${(props) => props.theme.fontColor};
    background-color: transparent;
    border:none;
    font-size: 12px;
    text-align: center;
    cursor: pointer;

    &.fixed {
        font-size: 14px;
    }

    &:disabled {
        opacity: .7;
    }
`

export const AtualPage = styled.span`
    &.atualPage {
        border-bottom: 1px solid ${(props) => props.theme.fontColor};
    }
`

