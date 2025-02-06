import React, { useEffect, useState } from 'react';
import StarRating from '../../components/starRating/StarRating';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button.js';
import getDayOfWeek from '../../js/getDayOfWeek.js';
import formatDate from '../../js/formatDate.js';
import {
    SessionFilterContainer,
    FilterBtn,
    SessionsContainer,
    Session,
    SessionImg,
    SessionInfo,
    H2,
} from './styles.js';
import Skeleton from 'react-loading-skeleton';
import SkeletonSession from '../skeleton-loading/SkeletonSession.jsx';

const Sessions = ({ sessions, isLoading }) => {

    const [groupedSessions, setGroupedSessions] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const grouped = sessions.reduce((acc, session) => {
            const dateKey = new Date(session.dateStart).toISOString().split('T')[0];
            const dayOfWeek = getDayOfWeek(session.dateStart);

            if (!acc[dateKey]) {
                acc[dateKey] = {
                    day: dayOfWeek,
                    sessions: [],
                };
            }

            acc[dateKey].sessions.push(session);
            return acc;

        }, {});

        const sortedGrouped = Object.keys(grouped)
            .sort((a, b) => new Date(a) - new Date(b))
            .reduce((acc, key) => {
                acc[key] = grouped[key];
                return acc;
            }, {});

        setGroupedSessions(sortedGrouped);

        if (selectedDate === null && Object.keys(sortedGrouped).length > 0) {
            setSelectedDate(Object.keys(sortedGrouped)[0]);
        }

    }, [sessions]);
    return (
        <div>
            <div>
                {isLoading ? (
                    <>
                        <SkeletonSession />
                    </>
                ) : (
                    <>
                        <SessionFilterContainer>
                            {Object.keys(groupedSessions).map(date => (
                                <div key={date}>
                                    <FilterBtn
                                        className={selectedDate === date ? 'selected' : ''}
                                        onClick={() => setSelectedDate(date)}
                                    >
                                        {new Date(date).getDate() === new Date().getDate() ? (
                                            <div>hoje</div>
                                        ) : (
                                            <div>
                                                <div>{getDayOfWeek(date.split('/').reverse().join('/'))}</div>
                                                <div>{formatDate(new Date(date.split('/').reverse().join('/'))).formattedDate}</div>
                                            </div>
                                        )}
                                    </FilterBtn>
                                </div>
                            ))}
                        </SessionFilterContainer>

                        <SessionsContainer>
                            {selectedDate &&
                                groupedSessions[selectedDate] &&
                                groupedSessions[selectedDate].sessions.map(session => (
                                    <Session key={session.id}>
                                        <div>
                                            <SessionImg>
                                                <SessionImg src={session.imageUrl} alt={session.movieName} />
                                            </SessionImg>
                                        </div>
                                        <div style={{ width: '100%' }}>
                                            <h2>{session.movieName}</h2>
                                            <SessionInfo>
                                                <div style={{ flexGrow: '1' }}>
                                                    <p>duração: {session.duration}</p>
                                                    <StarRating rating={session.rating} />
                                                </div>
                                                <div style={{ flexGrow: '2' }}>
                                                    <Link to={`/session/${session.id}`}><Button>Comprar</Button></Link>
                                                </div>
                                            </SessionInfo>
                                        </div>
                                    </Session>
                                ))}
                        </SessionsContainer>
                    </>
                )}
            </div>

        </div>
    )
}

export default Sessions