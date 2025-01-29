import React, { useEffect, useState } from 'react'
import backend from '../../../api/index'
import Cookies from 'js-cookie'
import TicketTemplate from './../ticket-template/TicketTemplate.jsx';
import Pagination from '../pagination/Pagination';
import { TicketsDetalContainer } from './styles.js';

const TicketUserData = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function handleGetUserTickets() {
      try {
        const response = await backend.ticketAPI.getTickets({
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`
          }
        })

        setTickets(response.data)
      } catch (err) {
        console.log('algo deu errado')
      }
    }
    handleGetUserTickets();
  }, [])


  return (
    <TicketsDetalContainer>
      <h2>Meus ingressos</h2>
      <Pagination objectList={tickets} itemsPerPage={12}>
        <TicketTemplate/>
      </Pagination>
    </TicketsDetalContainer>
  )
}

export default TicketUserData