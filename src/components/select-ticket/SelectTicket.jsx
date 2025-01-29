import React from 'react'
import { useState } from 'react'
import tickets from '../../data/ticketData.js'
import { Ticket, TicketButton, TicketContainer, TicketControl, TicketIcon, TicketInfo, TicketTitle } from './styled.js';

const SelectTicket = ({ selectTicket }) => {

    const [quantityTicket, setQuantityTicket] = useState({
        Inteira: 0,
        Meia: 0,
        '3D': 0,
        VIP: 0
    });

    const [disableAllButtons, setDisableAllButtons] = useState(false);

    const addTicket = (type, ticket) => {
        setQuantityTicket(prevQuantity => ({
            ...prevQuantity,
            [type]: prevQuantity[type] + 1
        }));

        setDisableAllButtons(true);
        selectTicket(ticket)

    }

    const removeTicket = (type) => {
        setQuantityTicket(prevTickets => ({
            ...prevTickets,
            [type]: prevTickets[type] > 0 ? prevTickets[type] - 1 : 0
        }));

        setDisableAllButtons(false);
        selectTicket(null)
    };


    return (
        <TicketContainer>
            {tickets.map(ticket => (
                <Ticket key={ticket.type}>
                    <TicketInfo>
                        <TicketIcon/>
                        <div>
                            <TicketTitle>{ticket.type}</TicketTitle>
                            <p>{ticket.price}</p>
                        </div>
                    </TicketInfo>
                    <TicketControl>
                        <TicketButton 
                        onClick={() => removeTicket(ticket.type)} disabled={quantityTicket[ticket.type] === 0}>-</TicketButton>
                        {quantityTicket[ticket.type]}
                        <TicketButton className={quantityTicket[ticket.type] > 0 ? 'select' : ''} 
                            onClick={() => addTicket(ticket.type, ticket)} disabled={disableAllButtons}>+</TicketButton>
                    </TicketControl>
                </Ticket>
            ))}
        </TicketContainer>
    )
}

export default SelectTicket