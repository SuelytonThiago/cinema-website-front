import React from 'react'
import './SelectChairComponent.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

const SelectChairComponent = ({id}) => {

    const [chairs, setChairs] = useState([]);
    const [selectedChairId, setSelectedChairId] = useState();

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
        getChairs();
    }, [id]);

    const handleChairClick = (id) => {
        setSelectedChairId(id);
    };

    return (
        <div>
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
    )
}

export default SelectChairComponent