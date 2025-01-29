import React, {useState, useEffect} from 'react';
import formatDate from '../../js/formatDate';
import formatHours from '../../js/formatHours';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';

import backend from '../../../api/index'
import { Chair, Chairs, ChairsContainer, EditDate, LegendContainer, LegendInfo, LegendSpan, RoomScreen, SessionInfoTime } from './styles';

const SelectChairComponent = ({ session, id, onChairSelect, chairId }) => {

    const [chairsData, setChairsData] = useState([]);

    useEffect(() => {
        async function handleGetChairsSession() {
            try {
                const response = await backend.chairAPI.getAllChairs(id)
                setChairsData(response.data);
            } catch(err) {
                console.log(err)
            }
        }

        handleGetChairsSession();
    }, [])

    const handleChairClick = (chairId) => {
        onChairSelect(chairId);
    };
    
    return (
        <div style={{flex : '1'}}>
            <SessionInfoTime>
                <EditDate>
                    <p><FaCalendarAlt />  {formatDate(new Date(session.dateStart)).dayOfWeek}</p>
                    <p>{formatDate(new Date(session.dateStart)).formattedDate}</p>
                </EditDate>

                <p className='editDate'><FaClock /> {formatHours(new Date(session.dateStart))}</p>
            </SessionInfoTime>
            <ChairsContainer>
                <Chairs>
                    {Array.isArray(chairsData) && chairsData.length > 0 ? (
                        chairsData.map(chair => (
                            <Chair
                                key={chair.chairNumber}
                                className={`${chair.available ? 'chairAvailable' : 'chairUnavailable'} ${chairId === chair.chairNumber ? 'selectedChair' : ''}`}
                                onClick={() => handleChairClick(chair.chairNumber)}
                                disabled={!chair.available}
                            >
                                {chair.chairNumber}
                            </Chair>
                        ))
                    ) : (
                        <p>Nenhuma cadeira disponível</p>
                    )}
                    <RoomScreen>Tela</RoomScreen>
                </Chairs>
                <LegendContainer>
                    <LegendInfo>
                        <LegendSpan className='chair chairAvailable'>c</LegendSpan>
                        <p> cadeira disponível</p>
                    </LegendInfo>
                    <LegendInfo>
                        <LegendSpan className='chair chairUnavailable'>c</LegendSpan>
                        <p> cadeira indisponível</p>
                    </LegendInfo>
                    <LegendInfo>
                        <LegendSpan className='chair selectedChair'>c</LegendSpan>
                        <p> cadeira selecionada</p>
                    </LegendInfo>
                </LegendContainer>
            </ChairsContainer>
        </div>
    );
};

export default SelectChairComponent;
