import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Session.css';
import formatDate from '../../js/formatDate';
import formatHours from '../../js/formatHours';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa'; 
import StarRating from '../../components/starRating/StarRating';
import SelectChairComponent from '../../components/selectChairComponent/SelectChairComponent';
import SelectTicket from '../../components/select-ticket/SelectTicket'

const Session = () => {
    const { id } = useParams();
    const [sessionInfoData, setSessionInfoData] = useState({});

    const getSessionInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/sessions/info/${id}`);
            const sessionData = response.data;
            setSessionInfoData(sessionData);
        } catch (error) {
            console.error('Error fetching session info:', error);
        }
    };

    useEffect(() => {
        getSessionInfo();
    }, [id]);

    return (
        <div className='sessionContainer'>
            <div className='sessionInformations'>
                <div className='entryRequesting'>
                    
                    <SelectTicket/>
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
                    </div>
                </div>
            </div>
            <div className='sessionRequestControl'>
                <button className='sessionControlBtn back'>Voltar</button>
                <button className='sessionControlBtn next'>Proximo</button>
            </div>
        </div>
    );
};

export default Session;
