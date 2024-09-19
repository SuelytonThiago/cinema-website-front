import React from 'react'
import './SelectTicket.css'
import { FaTicketAlt} from 'react-icons/fa';
import {useState} from 'react'
import tickets from '../../data/ticketData.js'

const SelectTicket = ({selectTicket}) => {

    const [quantityTicket, setQuantityTicket] = useState({
        Inteira: 0,
        Meia: 0,
        '3D': 0,
        VIP: 0
    });
    
    const [disableAllButtons, setDisableAllButtons] = useState(false);

    const addTicket = (type,ticket) => {
        setQuantityTicket(prevQuantity => ({
            ...prevQuantity,
            [type]: prevQuantity[type] +1
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
    <div className='ticketContainer'>
        {tickets.map(ticket => (
            <div className = 'ticket entire' key={ticket.id}>
                <div className='ticketInfo'>
                    <FaTicketAlt className='ticketIcon'/>
                    <div>
                        <p className='ticketTitle'>{ticket.type}</p>
                        <p>{ticket.price}</p>
                    </div>
                </div>
                <div className='ticketControl'> 
                    <button className='ticketButton' onClick={() => removeTicket(ticket.type)} disabled={quantityTicket[ticket.type]=== 0}>-</button>
                        {quantityTicket[ticket.type]}
                    <button className={`ticketButton ${quantityTicket[ticket.type]> 0 ? 'select' : ''}`} onClick={() => addTicket(ticket.type, ticket)} disabled={disableAllButtons}>+</button>
                </div>
            </div>
        ))}
    </div>
  )
}   

export default SelectTicket