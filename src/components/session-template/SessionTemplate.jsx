import React, { useState } from 'react'
import formatHours from '../../js/formatHours';
import { Link } from 'react-router-dom';
import './SessionTemplate.css'
import formatDate from '../../js/formatDate';
import { FaCalendarAlt } from 'react-icons/fa';
import tickets from '../../data/ticketData.js'
import getDayOfWeek from '../../js/getDayOfWeek.js';

const SessionTemplate = ({ session}) => {

    const [hoveredSessionId, setHoveredSessionId] = useState(null);

    return (
        <div>
            <div className='session' >
                <div className='sessionInfoContainer'>
                    <div className='sessionDetails'>
                        <div className='sessionTimes'>
                            <h2><FaCalendarAlt />{getDayOfWeek(session.dateStart)} </h2>
                            <h2>{formatDate(new Date(session.dateStart)).formattedDate}</h2>
                        </div>
                        <div className='sessionRoom'>
                            <h2>{session.sessionName}</h2>
                        </div>
                    </div>
                    <div className='sessionInfo'>
                        <div className='ticketsContainer'>
                            {tickets.map(ticker => (
                                <p>{ticker.type}</p>
                            ))}
                        </div>
                        <div
                            className='btnSession'>
                            <Link to={`/session/${session.id}`}
                                className='ticketBtn'
                                onMouseEnter={() => setHoveredSessionId(session.id)}
                                onMouseLeave={() => setHoveredSessionId(null)}>
                                {hoveredSessionId === session.id ? "Comprar" : formatHours(new Date(session.dateStart))}
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SessionTemplate