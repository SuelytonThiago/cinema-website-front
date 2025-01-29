import styled from "styled-components";

export const SessionFilterContainer = styled.div ` 
    background-color: #17191f;
    display: flex;
    height: 70px;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 1rem;
`

export const FilterBtn = styled.button `
    background-color: transparent;
    color: #666;
    border: none;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    text-transform: uppercase;

    &.selected {
        font-size: 20px;
        color: #fff;
    }
`


export const SessionsContainer = styled.div `
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const Session = styled.div ` 
    display: flex;
    height: auto;
    background-color: #17191f;
    gap: 1rem;
    padding: 1rem;
    border-radius: 5px;
`

export const SessionImg = styled.img `
    width: 200px;
    border-radius: 5px;
`

export const SessionTimes = styled.div `
    display: flex;
    align-items: center;
    gap: 10px;
`

export const SessionInfo = styled.div `
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    height: 70%;
`

export const Details = styled.div `
    flex-grow: 1;
`