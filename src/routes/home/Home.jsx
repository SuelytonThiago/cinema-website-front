import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import "./Home.css";
import { Link } from 'react-router-dom';
import StarRating from '../../components/StarRating';
import formatDate from '../../js/formatDate';
import formatHours from '../../js/formatHours';

const Home = () => {

  const [hoveredSessionId, setHoveredSessionId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [groupedSessions, setGroupedSessions] = useState({});

  const getSessions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/sessions");

      const data = response.data;
      setSessions(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
      const grouped = sessions.reduce((acc, session) => {
          const dateKey = formatDate(new Date(session.dateStart)).formattedDate;
          if (!acc[dateKey]) {
              acc[dateKey] = [];
          }
          acc[dateKey].push(session);
          return acc;
      }, {});
      setGroupedSessions(grouped);

      const sortedGrouped = Object.keys(grouped)
      .sort((a, b) => {
        const dateA = new Date(a.split('/').reverse().join('/'));
        const dateB = new Date(b.split('/').reverse().join('/'));
        return dateA - dateB;
      })
      .reduce((acc, key) => {
        acc[key] = grouped[key];
        return acc;
      }, {});

      setGroupedSessions(sortedGrouped);
      
  }, [sessions]);


  useEffect(() => {
    getSessions();
  }, []);

  return (
    <div>
      <div className='sessionFilterContainer'>
          {Object.keys(groupedSessions).map(date => (
              <div key={date}>
                  <button 
                  className={`filterBtn ${selectedDate === date ? 'selected' : ''}`}
                  onClick={() => setSelectedDate(date)}>
                      <div>{formatDate(new Date(date.split('/').reverse().join('/'))).dayOfWeek}</div>
                      <div>{formatDate(new Date(date.split('/').reverse().join('/'))).formattedDate}</div>
                  </button>
              </div>
          ))}
      </div>
      {selectedDate && groupedSessions[selectedDate] && (
          <div>
              <h2>Sessões para {selectedDate}</h2>
              <div className='sessionsContainer'>
                {groupedSessions[selectedDate].map((session) => (
                  <div className='session' key={session.id}>
                    <div className='sessionImg'>
                      <img src={session.imageUrl} alt={session.movieName} />
                    </div>
                    <div className='sessionInfoContainer'>
                      <h2>{session.movieName}</h2>
                      <div className='sessionInfo'>
                        <div className='details'>
                          <p>duração: {session.duration}</p>
                          <StarRating rating={session.rating}/>
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