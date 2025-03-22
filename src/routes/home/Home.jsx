import React, { useEffect, useState } from 'react'
import backend from "../../../api/index"
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Sessions from '../../components/sessions/Sessions.jsx';
import Error from '../../components/error/Error.jsx';
import RandomMovies from '../../components/random-movies/RandomMovies.jsx';
import { Container, H2 } from './styles.js';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';
import AddCategory from '../../components/admin-components/add-category/AddCategory.jsx';
import AddFilm from '../../components/admin-components/add-film/AddFilm.jsx';
import AddSession from '../../components/admin-components/add-session/AddSession.jsx';

const Home = () => {

  const { t } = useTranslation();

  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorServer, setErrorServer] = useState({});

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
        setIsLoading(false);

      } catch (err) {
        setIsLoading(false);
        setIsError(true);
        setErrorServer(err.response?.data || { status: 500, Message: t('erro-mensagem') });
      }
    }
    getSessions();
  }, []);



  return (
    <Container>
      <H2>{t('link-filmes')}: </H2>
      <RandomMovies />
      <AddCategory/>
      <AddFilm/>
      <AddSession/>
      <>
        <H2 >{t('sessoes')}: </H2>
        {isError ?
          (
            <Error code={errorServer.status} message={errorServer.Message} />
          )
          :
          (
            <>
              <Sessions sessions={sessions} isLoading={isLoading} />
            </>

          )
        }
      </>
    </Container>

  )
}

export default Home