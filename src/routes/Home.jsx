import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../components/StarRating';
import "./Home.css";

const getDayOfWeek = (date) => {
  const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
  return daysOfWeek[date.getDay()];
};

const formatDate = (date) => {
  const dayOfWeek = getDayOfWeek(date);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  
  return {
    dayOfWeek,
    formattedDate: `${day}/${month}`
  };
};


const Home = () => {

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
      
  }, [sessions]);


  useEffect(() => {
    getSessions();
  }, []);

  const datesInOrder = Object.keys(groupedSessions)
    .map(date => ({
        date,
        dateObject: new Date(date.split('/').reverse().join('-'))
    }))
    .sort((a, b) => a.dateObject - b.dateObject)
    .map(item => item.date);


  return (
    <div>
      <div className='sessionFilterContainer'>
          {datesInOrder.map(date => (
            
              <div key={date}>
                  <button 
                  className={`filterBtn ${selectedDate === date ? 'selected' : ''}`}
                  onClick={() => setSelectedDate(date)}>
                      <div>{formatDate(new Date(date)).dayOfWeek}</div>
                      <div>{formatDate(new Date(date)).formattedDate}</div>
                  </button>
              </div>
          ))}
      </div>
      {selectedDate && groupedSessions[selectedDate] && (
          <div>
              <h2>Sessões para {selectedDate}</h2>
              <div className='homeContainer'>
                  {groupedSessions[selectedDate].map((session) => (
                      <div className='sessionsHome' key={session.id}>
                          <div className='sessionInfo'>
                              <div className='img'>
                                  <img src={session.imageUrl} alt={session.movieName} />
                              </div>
                              <div className='info'>
                                  <h2>{session.movieName}</h2>
                                  <StarRating rating={session.rating} />
                                  <p>Duração: {session.duration}</p>
                              </div>
                          </div>
                          <Link to={`/session/${session.id}`} className='btn'>Ver mais</Link>
                      </div>
                  ))}
              </div>
          </div>
      )}
    </div>
  )
}

export default Home