import React from 'react'
import { useState, useEffect } from 'react';
import "./Home.css";
import formatDate from '../../js/formatDate';

import { useSessionsData } from '../../hooks/UseSessionsData';
import StarRating from '../../components/starRating/StarRating';
import { Link } from 'react-router-dom';
import formatHours from '../../js/formatHours';
import getDayOfWeek from '../../js/getDayOfWeek';


const Home = () => {

  const [hoveredSessionId, setHoveredSessionId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [groupedSessions, setGroupedSessions] = useState({});

  const { data: sessionsData = [], isLoading, error } = useSessionsData();

  useEffect(() => {
    const grouped = sessionsData.reduce((acc, session) => {
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

    setGroupedSessions(grouped);

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

  }, [sessionsData]);


  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar as sessões</div>;

  return (
    <div>
      <div className='sessionFilterContainer'>
        {Object.keys(groupedSessions).map(date => (
          <div key={date}>
            <button
              className={`filterBtn ${selectedDate === date ? 'selected' : ''}`}
              onClick={() => setSelectedDate(date)}>
              <div>{getDayOfWeek(date.split('/').reverse().join('/'))}</div>
              <div>{formatDate(new Date(date.split('/').reverse().join('/'))).formattedDate}</div>
            </button>
          </div>
        ))}
      </div>
      {selectedDate && groupedSessions[selectedDate] && (
        <div>
          <h2>Sessões para {selectedDate}</h2>
          <div className='sessionsContainer'>
            {groupedSessions[selectedDate].sessions.map((session) => (
              <div className='session' key={session.id}>
                <div className='sessionImg'>
                  <img src={session.imageUrl} alt={session.movieName} />
                </div>
                <div className='sessionInfoContainer'>
                  <h2>{session.movieName}</h2>
                  <div className='sessionInfo'>
                    <div className='details'>
                      <p>duração: {session.duration}</p>
                      <StarRating rating={session.rating} />
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
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home