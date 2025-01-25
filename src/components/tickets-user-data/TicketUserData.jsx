import React, { useEffect, useState } from 'react'
import backend from '../../../api/index'
import Cookies from 'js-cookie'
import './TicketUserData.css'

import TicketTemplate from './../ticket-template/TicketTemplate.jsx';
import Pagination from '../pagination/Pagination';

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
    <div className='ticketsDetalContainer'>
      <h2>Meus ingressos</h2>
      <Pagination objectList={tickets} itemsPerPage={12}>
        <TicketTemplate/>
      </Pagination>
    </div>
  )
}

export default TicketUserData