import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Session.css';
import formatDate from '../../js/formatDate';
import formatHours from '../../js/formatHours';
import { FaCalendarAlt, FaUser, FaClock} from 'react-icons/fa';
import StarRating from '../../components/starRating/StarRating';
import SelectChairComponent from '../../components/selectChairComponent/SelectChairComponent';
import SelectTicket from '../../components/select-ticket/SelectTicket'
import { useSessionData } from '../../hooks/UseSessionData';
import { useTicketMutate } from '../../hooks/UseTicketMutate';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../login/LoginModal.jsx';

import Cookies from 'js-cookie';

const Session = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [showComponent, setShowComponent] = useState(true);
    const [showViewLogin, setShowViewLogin] = useState(false);
    const [selectedChairId, setSelectedChairId] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const {data: sessionInfoData, isLoading, error} = useSessionData(id);

    const mutation = useTicketMutate();

    const handleAddTicket = () => {
        if(!!Cookies.get("accessToken")){
            const sessionId = id;
            const price = selectedTicket?.price;

            const chairNumber = selectedChairId - 1;

            mutation.mutate({ sessionId, price, chairNumber });
            navigate('/');
        }
        else {
           setShowViewLogin(true);
        }
    };

    const handleLoginSuccess = () => {
        setShowViewLogin(false);
    }

    
    const selectTicket = (ticket) => {
        setSelectedTicket(ticket)
    }

    const handleChairSelect = (id) => {
        if(id === selectedChairId) {
            setSelectedChairId(null)
        }
        else {
            setSelectedChairId(id);
        }
    };

    const next = () =>{
        setShowComponent(false)
    }

    const back = () =>{
        setShowComponent(true)
        setSelectedTicket(null)
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }
    
    if (error) {
        return <p>Error: {error.message}</p>;
    }
    
    if (!sessionInfoData) {
        return <p>No session data available</p>;
    }

    return (
        <div className='sessionContainer'>
            <div className='sessionInformations'>
                <div className='entryRequesting'>
                    {showComponent ? (
                            <SelectChairComponent id={id} session ={sessionInfoData} onChairSelect={handleChairSelect} chairId={selectedChairId}/>
                        ) : (
                            <SelectTicket selectTicket={selectTicket}/>
                        )
                    }
                </div>
                <div className='sessionRequestInformations'>
                    <h3>Resumo do pedido</h3>
                    <div className='ticketRequestInformations'>
                        <div className='movieInformations'>
                            <img src={sessionInfoData.imageUrl} alt={sessionInfoData.movieName} />
                            <div>
                                <p>{sessionInfoData.movieName}</p>
                                <StarRating rating={sessionInfoData.rating}/>
                                <p>duração {sessionInfoData.duration}</p>
                            </div>
                        </div>
                        <div className='chairInformations'>
                            <div className = 'sessionTime'>
                                <p>{sessionInfoData.sessionName}</p>
                                <div>
                                    <div className='editDate'>
                                        <p><FaCalendarAlt/>{formatDate(new Date(sessionInfoData.dateStart)).dayOfWeek}</p>
                                        <p>{formatDate(new Date(sessionInfoData.dateStart)).formattedDate}</p>
                                        <p><FaClock/>{formatHours(new Date(sessionInfoData.dateStart))}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {!!selectedChairId && (
                            <div className='chairInformation'>
                                <p>Assento: {selectedChairId}</p>
                            </div>
                        )}
                        {!!selectedTicket && (
                            <div className='ticketInformation'>
                                <p>ingresso</p>
                                <div className='tInfo'>
                                    <p>{selectedTicket.type}</p>
                                    <p>{selectedTicket.price}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='sessionRequestControl'>
                <button className='sessionControlBtn back'onClick={back}>Voltar</button>
                {showComponent ? (
                    <button className={`sessionControlBtn next ${!selectedChairId  ? 'disabled' : ''}`} onClick={next} disabled={!selectedChairId}>Próximo</button>
                ) : (   
                        <button className ={`sessionControlBtn next ${!selectedTicket  ? 'disabled' : ''}`} onClick={handleAddTicket}>Finalizar</button>
                )}
                
            </div>
            {showViewLogin && 
                <div>
                    <div className='overlay'></div>
                    <div className='authenticationTab'>
                    <div className='authenticationTitle'><FaUser/>Identificação</div>
                        <LoginModal handleLoginSuccess={handleLoginSuccess}/>
                    </div>
                </div>
            }
        </div>
    );
};

export default Session;
