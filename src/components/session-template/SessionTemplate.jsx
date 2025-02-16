import React, { useState } from 'react'
import formatHours from '../../js/formatHours';
import { Link } from 'react-router-dom';
import formatDate from '../../js/formatDate';
import { FaCalendarAlt } from 'react-icons/fa';
import tickets from '../../data/ticketData.js'
import getDayOfWeek from '../../js/getDayOfWeek.js';
import { BtnSession, Session, SessionDetails, SessionRoom, SessionTimes, TicketsContainer } from './styles.js';
import { LinkBtn } from '../Link.js';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';

const SessionTemplate = ({ session }) => {

    const [hoveredSessionId, setHoveredSessionId] = useState(null);

    const { t } = useTranslation();

    return (
        <Session>
            <div style={{ width: '100%' }}>
                <SessionDetails>
                    <SessionTimes>
                        <h2><FaCalendarAlt />{getDayOfWeek(session.dateStart)} </h2>
                        <h2>{formatDate(new Date(session.dateStart)).formattedDate}</h2>
                    </SessionTimes>
                    <div className='sessionRoom'>
                        <h2>{session.sessionName}</h2>
                    </div>
                </SessionDetails>
                <SessionRoom>
                    <TicketsContainer>
                        {tickets.map(ticker => (
                            <p key={ticker.type}>{ticker.type}</p>
                        ))}
                    </TicketsContainer>
                    <BtnSession>
                        <LinkBtn to={`/session/${session.id}`}
                            onMouseEnter={() => setHoveredSessionId(session.id)}
                            onMouseLeave={() => setHoveredSessionId(null)}>
                            {hoveredSessionId === session.id ? t('comprar') : formatHours(new Date(session.dateStart))}
                        </LinkBtn>
                    </BtnSession>
                </SessionRoom>

            </div>
        </Session>
    )
}

export default SessionTemplate