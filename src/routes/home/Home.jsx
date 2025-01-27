import React, { useEffect, useState } from 'react'
import "./Home.css";
import backend from "../../../api/index"
import Session from '../../components/session/Session';
import getDayOfWeek from '../../js/getDayOfWeek';
import formatDate from '../../js/formatDate';
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Home = () => {

  const [sessions, setSessions] = useState([])
  const [groupedSessions, setGroupedSessions] = useState([])
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/sessions", (message) => {
        const newSession = JSON.parse(message.body);

        setSessions((prevSessions) => {
          const existingSessionIndex = prevSessions.findIndex(session => session.id === newSession.id);

          if (existingSessionIndex !== -1) {

            const updatedSession = [...prevSessions];
            updatedSession[existingSessionIndex] = newSession;
            return updatedSession;
          } else {
            return [...prevSessions, newSession];
          }
        });
      });
    });

    return () => {
      stompClient.disconnect();
    };
  }, []);

  useEffect(() => {
    async function getSessions() {
      try {
        const response = await backend.sessionAPI.getAll();
        setSessions(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getSessions();
  }, []);

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
        <div>
          <div className='sessionFilterContainer'>
            {Object.keys(groupedSessions).map(date => (
              <div key={date}>
                <button
                  className={`filterBtn ${selectedDate === date ? 'selected' : ''}`}
                  onClick={() => setSelectedDate(date)}>
                  {new Date(date).getDate() === new Date().getDate() ?
                    (
                      <div>hoje</div>
                    )
                    :
                    (
                      <div>
                        <div>{getDayOfWeek(date.split('/').reverse().join('/'))}</div>
                        <div>{formatDate(new Date(date.split('/').reverse().join('/'))).formattedDate}</div>
                      </div>
                    )
                  }
                </button>
              </div>
            ))}
          </div>
        </div>
        <h2>Sessões para {formatDate(new Date(selectedDate)).formattedDate}</h2>
        <div className='sessionsContainer'>
          {selectedDate && groupedSessions[selectedDate] ? (
            groupedSessions[selectedDate].sessions.map(s => (
              <Session session={s} key={s.id} />
            ))
          ) : (
            <div>Loading sessions...</div>
          )}
        </div>
      </div>
    </div >
  )
}

export default Home