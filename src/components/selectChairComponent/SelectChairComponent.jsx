import React from 'react';
import './SelectChairComponent.css';
import { useState } from 'react';
import { useChairData } from '../../hooks/UseChairData';
import formatDate from '../../js/formatDate';
import formatHours from '../../js/formatHours';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa'; 

const SelectChairComponent = ({ session, id}) => {
    const { data: chairsData, isLoading, isError } = useChairData(id);
    const [selectedChairId, setSelectedChairId] = useState();

    const handleChairClick = (chairId) => {
        setSelectedChairId(chairId);
    };

    return (
        <div className='ChairsInfoContainer'>
            <div className='sessionInfoTime'>
                <div className='editDate'>
                    <p><FaCalendarAlt/>  {formatDate(new Date(session.dateStart)).dayOfWeek}</p>
                    <p>{formatDate(new Date(session.dateStart)).formattedDate}</p>
                </div>
                
                <p className='editDate'><FaClock/> {formatHours(new Date(session.dateStart))}</p>
            </div>
            <div className='chairsContainer'>
                <div className='chairs'>
                    {Array.isArray(chairsData) && chairsData.length > 0 ? (
                        chairsData.map(chair => (
                            <button
                                key={chair.chairNumber}
                                className={`chair ${chair.available ? 'chairAvailable' : 'chairUnavailable'} 
                                ${selectedChairId === chair.chairNumber ? 'selectedChair' : ''}`}
                                onClick={() => handleChairClick(chair.chairNumber)}
                                disabled={!chair.available}
                            >
                                {chair.chairNumber}
                            </button>
                        ))
                    ) : (
                        <p>Nenhuma cadeira disponível</p>
                    )}
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
    );
};

export default SelectChairComponent;
