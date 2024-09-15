import React from 'react'
import { useTicketMutate } from '../../hooks/UseTicketMutate'
import './SelectTicket.css'
import { FaTicketAlt } from 'react-icons/fa';
import {useState} from 'react'
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa'; 

const SelectTicket = () => {

    const [quantityTicket, setQuantityTicket] = useState(0);

  return (
    <div className='ticketContainer'>
        <div className = 'ticket entire'>
            <div className='ticketInfo'>
                <FaTicketAlt className='ticketIcon'/>
                <p>Inteira</p>
            </div>
            <div className='ticketControl'> 
                <button className='ticketButton'><FaPlus/></button>
                    {quantityTicket}
                <button className='ticketButton'><FaMinus/></button>
            </div>
        </div>
        <div className='ticket'>
            <div className='ticketInfo'>
                <FaTicketAlt className='ticketIcon halfIcon'/>
                <p>Meia</p>
            </div>
            <div className='ticketControl'> 
                <button className='ticketButton'><FaPlus/></button>
                    {quantityTicket}
                <button className='ticketButton'><FaMinus/></button>
            </div>
        </div>
        <div className='ticket'>
            <div className='ticketInfo'>
                <FaTicketAlt className='ticketIcon halfIcon'/>
                <p>3D</p>
            </div>
            <div className='ticketControl'> 
                <button className='ticketButton'><FaPlus/></button>
                    {quantityTicket}
                <button className='ticketButton'><FaMinus/></button>
            </div>
        </div>
        <div className='ticket'>
            <div className='ticketInfo'>
                <FaTicketAlt className='ticketIcon halfIcon'/>
                <p>VIP</p>
            </div>
            <div className='ticketControl'> 
                <button className='ticketButton deselect'>-</button>
                    {quantityTicket}
                <button className='ticketButton select'>+</button>
            </div>
        </div>
    </div>
  )
}

export default SelectTicket