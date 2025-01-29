import React from 'react'
import formatDate from '../../js/formatDate';
import { MdChair } from "react-icons/md";
import { FilmCover, H4, SessionDate, SessionDay, TicketData, TicketDetails, TicketUserContainer } from './styles';

const TicketTemplate = ({ item }) => {
    return (

        <TicketUserContainer>
            <FilmCover>
                <img src={item.movieImgUrl} alt="movie image" />
            </FilmCover>
            <TicketData>
                <SessionDate>
                    <H4>{item.movieName}</H4>
                    <SessionDay>
                        <p>{formatDate(new Date(item.sessionDate.split('/').reverse().join('/'))).formattedDate}</p>
                    </SessionDay>
                    <TicketDetails>
                        <p>{item.sessionName}</p>
                        <p>R$ {item.price}</p>
                        <p><MdChair /> {item.chairNumber}</p>
                    </TicketDetails>
                </SessionDate>
            </TicketData>
        </TicketUserContainer>

    )
}

export default TicketTemplate