import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import formatDate from '../../js/formatDate';
import formatHours from '../../js/formatHours';
import { FaCalendarAlt, FaClock, FaTicketAlt } from 'react-icons/fa';
import StarRating from '../../components/starRating/StarRating';
import SelectChairComponent from '../../components/selectChairComponent/SelectChairComponent';
import SelectTicket from '../../components/select-ticket/SelectTicket'
import { useNavigate } from 'react-router-dom';
import LoginModal from '../login/LoginModal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { showLoginModal } from '../../redux/show-login-modal/actions.js';
import backend from "../../../api/index.ts"
import { MdEventSeat } from "react-icons/md";
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import { ChairInfo, ChairInformation, EditDate, EntryRequesting, Info, MovieInformations, SessionContainer, SessionControlBtn, SessionInformations, SessionRequestControl, SessionRequestInformations, SessionTime, TicketInfo, TicketInformation, TicketRequestInformations } from './styles.js';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';

const Session = () => {


    const { t } = useTranslation();

    const navigate = useNavigate();
    const { id } = useParams();
    const [showComponent, setShowComponent] = useState(true);
    const [selectedChairId, setSelectedChairId] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [sessionData, setSessionData] = useState(null);

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
        setShowComponent(false);
    }

    const back = () => {
        if(showComponent){
            navigate('/');
        }
        else{
            setShowComponent(true);
            setSelectedTicket(null);
        }
    }

    if (!sessionData) {
        return <div>Loading</div>
    }

    return (
        <SessionContainer>
            <SessionInformations>
                <EntryRequesting>
                    {showComponent ? (
                        <SelectChairComponent id={id} session={sessionData} onChairSelect={handleChairSelect} chairId={selectedChairId} />
                    ) : (
                        <SelectTicket selectTicket={selectTicket} />
                    )
                    }
                </EntryRequesting>
                <SessionRequestInformations>
                    <h3>{t('resumo-do-pedido')}</h3>
                    <TicketRequestInformations>
                        <MovieInformations>
                            <img src={sessionData.imageUrl} alt={sessionData.movieName} />
                            <div>
                                <p>{sessionData.movieName}</p>
                                <StarRating rating={sessionData.rating} />
                                <p>{t('duração')} {sessionData.duration}</p>
                            </div>
                        </MovieInformations>
                        <div className='chairInformations'>
                            <SessionTime>
                                <p>{sessionData.sessionName}</p>
                                <div>
                                    <EditDate>
                                        <p><FaCalendarAlt />{formatDate(new Date(sessionData.dateStart)).dayOfWeek}</p>
                                        <p>{formatDate(new Date(sessionData.dateStart)).formattedDate}</p>
                                        <p><FaClock />{formatHours(new Date(sessionData.dateStart))}</p>
                                    </EditDate>
                                </div>
                            </SessionTime>
                        </div>
                        {!!selectedChairId && (
                            <ChairInformation>
                                <ChairInfo>
                                    <MdEventSeat size={20} />
                                    {selectedChairId}
                                </ChairInfo>
                            </ChairInformation>
                        )}
                        {!!selectedTicket && (
                            <TicketInformation>
                                <Info>
                                    <TicketInfo>
                                        <FaTicketAlt />
                                        <p>{selectedTicket.type}</p>
                                    </TicketInfo>
                                    <p>{selectedTicket.price}</p>
                                </Info>
                            </TicketInformation>
                        )}
                    </TicketRequestInformations>
                </SessionRequestInformations>
            </SessionInformations>
            <SessionRequestControl>
                <SessionControlBtn className='back' onClick={back}>{t('botao-voltar')}</SessionControlBtn>
                {showComponent ? (
                    <SessionControlBtn
                        className={`next ${!selectedChairId ? 'disabled' : ''}`}
                        onClick={next} disabled={!selectedChairId}>
                        {t('botao-proximo')}
                    </SessionControlBtn>
                ) : (
                    <SessionControlBtn
                        className={`next ${!selectedTicket ? 'disabled' : ''}`}
                        onClick={handleAddTicket}>
                        {t('botao-finalizar')}
                    </SessionControlBtn>
                )}

            </SessionRequestControl>
            {isVisible && <LoginModal />}
        </SessionContainer>
    );
};

export default Session;
