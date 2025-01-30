import styled from "styled-components";
import { FaTicketAlt } from 'react-icons/fa';

export const TicketContainer = styled.div`
    display: flex;
    width: 80%;
    flex-direction: column;
    gap: 2rem;
`

export const Ticket = styled.div`
    background-color:  ${(props) => props.theme.childrenContainer};
    padding: 1rem;
    flex: 1;
    color: #fff;
    display: flex;
    border-radius: 5px;
    align-items: center;
    justify-content: space-between;
    border: ${(props) => props.theme.border}
`

export const TicketInfo = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: .5rem;
`


export const TicketIcon = styled(FaTicketAlt)`
    font-size: 34px;
    transform: rotate(45deg);
    color: ${(props) => props.theme.fontColor};
`

export const TicketControl = styled.div`
    display: flex;
    gap: 10px;
    color: ${(props) => props.theme.fontColor};
`

export const TicketButton  = styled.button`
    border-radius: 50%;
    width: 20px;
    height: 20px;
    text-align: center;
    border: none;
    color: #fff;
    cursor: pointer;
    background-color: #585885;

    &.select {
        background-color: #774baf;
    }

    &.deselect {
        background-color: #1c1c20;
    }


`
export const TicketTitle = styled.div`
    font-weight: bold;
    color: ${(props) => props.theme.fontColor};
`