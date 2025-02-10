import React, { useEffect, useState } from 'react'
import backend from '../../../api/index'
import Cookies from 'js-cookie'
import TicketTemplate from './../ticket-template/TicketTemplate.jsx';
import Pagination from '../pagination/Pagination';
import { TicketsDetalContainer } from './styles.js';
import Error from '../error/Error.jsx';
import MyTicketsSkeleton from '../skeleton-loading/user-skeleton/MyTicketsSkeleton.jsx';

const TicketUserData = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorServer, setErrorServer] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function handleGetUserTickets() {
      try {
        const response = await backend.ticketAPI.getTickets({
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`
          }
        })

        setTickets(response.data)
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        setErrorServer(err.response?.data || { status: 500, Message: "Erro desconhecido" });
      }
    }
    handleGetUserTickets();
  }, [])


  return (
    <TicketsDetalContainer>
      <h2>Meus ingressos</h2>
      {isError ? (<Error code={errorServer.status} message={errorServer.Message} />)
        : (
          isLoading ? (<MyTicketsSkeleton />) : (
            <Pagination objectList={tickets} itemsPerPage={12}>
              <TicketTemplate />
            </Pagination>
          )
        )
      }
    </TicketsDetalContainer>
  )
}

export default TicketUserData