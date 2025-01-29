import styled from "styled-components";

export const Session = styled.div `
    display: flex;
    height: auto;
    background-color: #17191f;
    gap: 1rem;
    padding: 1rem;
    border-radius: 5px;
`

export const SessionDetails = styled.div `
    border-bottom: 1px solid #fff;
    padding-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`

export const SessionTimes = styled.div `
    display: flex;
    align-items: center;
    gap: 10px;
`

export const SessionRoom = styled.div `
    text-transform: uppercase;
    display: flex;
    flex-direction:column;
    gap: .5rem;
`

export const TicketsContainer = styled.div `
    display: flex;
    gap: 10px;
    font-size: 15px;
    padding: 1rem 0;

    p {
        background-color:#1262da ;
        color: #ffffff;
        padding: .1rem;
        border-radius: 5px;
    }
`



export const BtnSession = styled.div` 
    flex-grow: 2;
`
