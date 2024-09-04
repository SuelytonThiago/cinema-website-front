import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../components/StarRating';
import SessionFilterByDate from '../components/SessionFilterByDate';
import "./Home.css";


const Home = () => {
  const [sessions, setSessions] = useState([]);

  const getSessions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/sessions");

      const data = response.data;
      setSessions(data);

    } catch (error) {
      console.log(error);
    }
  }

  const getSessionsByDay = async(day) => {
    try{
      const response = await axios.get(`http://localhost:8080/api/sessions/ofDay/${day}`);
      const data = response.data;
      setSessions(data);
    }catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <div className='homeContainer'>
      <h1>Sessões</h1>
      <SessionFilterByDate getSessionsByDay={getSessionsByDay} getSessions={getSessions}/>
      
      {sessions.length === 0 ? <p>Carregando...</p> :
        sessions.map((session) => (
          <div className="sessionsHome" key={session.id}>
            <div className="sessionInfo">
              <div className="img">
                <img src={session.imageUrl} alt={session.movieName} />
              </div>
              <div className="info">
                <h2>{session.movieName}</h2>
                <StarRating rating ={session.rating}/>
                <p>duração: {session.duration}</p>
              </div>
            </div>
            <Link to={`/session/${session.id}`} className='btn'>Ver mais</Link>
          </div>
        ))}
    </div>
  )
}

export default Home