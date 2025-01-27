import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Session.css';
import formatDate from '../../js/formatDate';
import formatHours from '../../js/formatHours';
import { FaCalendarAlt, FaUser, FaClock } from 'react-icons/fa';
import StarRating from '../../components/starRating/StarRating';
import SelectChairComponent from '../../components/selectChairComponent/SelectChairComponent';
import SelectTicket from '../../components/select-ticket/SelectTicket'
import { useNavigate } from 'react-router-dom';
import LoginModal from '../login/LoginModal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { showLoginModal } from '../../redux/show-login-modal/actions.js';
import backend from "../../../api/index.ts"

import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

const Session = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [showComponent, setShowComponent] = useState(true);
    const [selectedChairId, setSelectedChairId] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [sessionData, setSessionData] = useState(null);

    useEffect(() => {
        async function handleGetSessionData() {
            try {
                const res = await backend.sessionAPI.getInfoSession(id);
                setSessionData(res.data);
            } catch (err) {
                toast.error(err.response.data.Message);
            }
        }

        handleGetSessionData();
    }, [])

    const { isVisible } = useSelector((rootReducer) => rootReducer.loginModalReducer)
    const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);
    const dispatch = useDispatch();



    const handleAddTicket = async () => {
        const ticketData = {
            sessionId: id,
            price: selectedTicket?.price,
            chairNumber: selectedChairId - 1,
        }
        if (currentUser) {
            try {
                await backend.ticketAPI.addTicket(ticketData, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('accessToken')}`
                    }
                })
                navigate('/');
            } catch (err) {
                toast.error(err.response.data.Message);
            }

        } else {
            dispatch(showLoginModal());
        }
    };

    const selectTicket = (ticket) => {
        setSelectedTicket(ticket)
    }

    const handleChairSelect = (id) => {
        if (id === selectedChairId) {
            setSelectedChairId(null)
        }
        else {
            setSelectedChairId(id);
        }
    };

    const next = () => {
        setShowComponent(false)
    }

    const back = () => {
        setShowComponent(true)
        setSelectedTicket(null)
    }

    return (
        <div className='sessionContainer'>
            <div className='sessionInformations'>
                <div className='entryRequesting'>
                    {showComponent ? (
                        <SelectChairComponent id={id} session={sessionData} onChairSelect={handleChairSelect} chairId={selectedChairId} />
                    ) : (
                        <SelectTicket selectTicket={selectTicket} />
                    )
                    }
                </div>
                <div className='sessionRequestInformations'>
                    <h3>Resumo do pedido</h3>
                    <div className='ticketRequestInformations'>
                        <div className='movieInformations'>
                            <img src={sessionData.imageUrl} alt={sessionData.movieName} />
                            <div>
                                <p>{sessionData.movieName}</p>
                                <StarRating rating={sessionData.rating} />
                                <p>duração {sessionData.duration}</p>
                            </div>
                        </div>
                        <div className='chairInformations'>
                            <div className='sessionTime'>
                                <p>{sessionData.sessionName}</p>
                                <div>
                                    <div className='editDate'>
                                        <p><FaCalendarAlt />{formatDate(new Date(sessionData.dateStart)).dayOfWeek}</p>
                                        <p>{formatDate(new Date(sessionData.dateStart)).formattedDate}</p>
                                        <p><FaClock />{formatHours(new Date(sessionData.dateStart))}</p>
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
                <button className='sessionControlBtn back' onClick={back}>Voltar</button>
                {showComponent ? (
                    <button className={`sessionControlBtn next ${!selectedChairId ? 'disabled' : ''}`} onClick={next} disabled={!selectedChairId}>Próximo</button>
                ) : (
                    <button className={`sessionControlBtn next ${!selectedTicket ? 'disabled' : ''}`} onClick={handleAddTicket}>Finalizar</button>
                )}

            </div>
            {isVisible && <LoginModal />}
        </div>
    );
};

export default Session;
