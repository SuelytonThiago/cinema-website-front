import styled, { keyframes } from "styled-components";

export const SessionFilterContainer = styled.div` 
    background-color:${(props) => props.theme.mainContainer};
    display: flex;
    height: 70px;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 1rem;
    border-bottom:${(props) => props.theme.border};

`

export const FilterBtn = styled.button`
    background-color: transparent;
    color: ${(props) => props.theme.fontColor};
    border: none;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    text-transform: uppercase;
    opacity: .8;

    &.selected {
        opacity: 1;
        font-size: 20px;
        color: ${(props) => props.theme.fontColor};

        @media screen and (max-width: 425px){
        font-size: 14px;
    }
        
    }

    @media screen and (max-width: 425px){
        font-size: 12px;
    }
`

export const SessionsData = styled.h2`
    @media screen and (max-width: 425px){
        font-size: 19px;
    }
`


export const SessionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

`

export const LoadingImg = styled.div`
    width: 200px;
    height: 300px;
`

export const Session = styled.div` 
    display: flex;
    height: auto;
    background-color: ${(props) => props.theme.mainContainer};
    gap: 1rem;
    padding: 1rem;
    border-radius: 5px;
    border: ${(props) => props.theme.border};
`

export const SessionImg = styled.img`
    width: 200px;
    border-radius: 5px; 

    @media screen and (max-width: 425px){
        width: 150px;
    }
`

export const H2 = styled.h2`
    @media screen and (max-width: 425px){
        font-size: 15px;
    }
`

export const P = styled.h2`
    @media screen and (max-width: 425px){
        font-size: 12px;
    }
`

export const SessionTimes = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const SessionInfo = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    height: 70%;
`

export const Details = styled.div`
    flex-grow: 1;
`