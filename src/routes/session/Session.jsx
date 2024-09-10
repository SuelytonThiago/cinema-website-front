import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Session.css';
import formatDate from '../../js/formatDate';
import formatHours from '../../js/formatHours';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa'; 
import StarRating from '../../components/StarRating';


const Session = () => {
    const { id } = useParams();
    const [chairs, setChairs] = useState([]);
    const [sessionInfoData, setSessionInfoData] = useState({});
    const [selectedChairId, setSelectedChairId] = useState();

    const getSessionInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/sessions/info/${id}`);
            const sessionData = response.data;
            console.log('Session info data:', sessionData);
            setSessionInfoData(sessionData);
        } catch (error) {
            console.error('Error fetching session info:', error);
        }
    };

    const getChairs = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/chairs/${id}`);
            const chairsData = response.data;
            setChairs(chairsData);
        } catch (error) {
            console.error('Error fetching chairs:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getChairs();
            await getSessionInfo();
        };

        fetchData();
    }, [id]);

    const handleChairClick = (id) => {
        setSelectedChairId(id);
    };

    return (
        <div className='sessionContainer'>
            <div className='sessionInformations'>
                <div className='selectChairContainer'>
                    <div className='sessionInfoTime'>
                            <div className='editDate'>
                                <p><FaCalendarAlt/>  {formatDate(new Date(sessionInfoData.dateStart)).dayOfWeek}</p>
                                <p>{formatDate(new Date(sessionInfoData.dateStart)).formattedDate}</p>
                            </div>
                            
                            <p className='editDate'><FaClock/> {formatHours(new Date(sessionInfoData.dateStart))}</p>
                    </div>
                    <div className='chairsContainer'>
                        <div className='chairs'>
                            {chairs.map(chair => (
                                <button
                                    key={chair.chairNumber}
                                    className={`chair ${chair.available ? 'chairAvailable' : 'chairUnavailable'} 
                                    ${selectedChairId === chair.chairNumber ? 'selectedChair' : ''}`}
                                    onClick={() => handleChairClick(chair.chairNumber)}
                                    disabled={!chair.available}
                                >
                                    {chair.chairNumber}
                                </button>
                            ))}
                            <div className='roomScreen'>Tela</div>
                        </div>
                        <div className='legendContainer'>
                            <div className='legendInfo'>
                                <span className='chair chairAvailable'>c</span>
                                <p> cadeira disponível</p>
                            </div>
                            <div className='legendInfo'>
                                <span className='chair chairUnavailable'>c</span>
                                <p> cadeira indisponível</p>
                            </div>
                            <div className='legendInfo'>
                                <span className='chair selectedChair'>c</span>
                                <p> cadeira selecionada</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='sessionRequestInformations'>
                    <h3>Resumo do pedido</h3>
                    <div>
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
