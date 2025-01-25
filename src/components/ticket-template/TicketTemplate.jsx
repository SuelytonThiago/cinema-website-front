import React from 'react'
import './TicketTemplate.css'
import formatDate from '../../js/formatDate';
import { MdChair } from "react-icons/md";

const TicketTemplate = ({ item }) => {
    return (

        <div className='ticketUserContainer'>
            <div className='filmCover'>
                <img src={item.movieImgUrl} alt="movie image" />
            </div>
            <div className='ticketData'>
                <div className='sessionDate'>
                    <div className='titleMovieName'>
                        <h4>{item.movieName}</h4>
                    </div>
                    <div className='sessionDay'>
                        <p>{formatDate(new Date(item.sessionDate.split('/').reverse().join('/'))).formattedDate}</p>
                    </div>
                    <div className='ticketDetails'>
                        <p>{item.sessionName}</p>
                        <p>R$ {item.price}</p>
                        <p><MdChair /> {item.chairNumber}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TicketTemplate