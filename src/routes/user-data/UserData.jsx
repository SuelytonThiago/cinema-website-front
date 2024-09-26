import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './UserData.css';
import { FaTicketAlt, FaIdCard, FaSignOutAlt } from 'react-icons/fa';

const UserData = () => {
    const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

    const [activeComponent, setActiveComponent] = useState(null);

    const handleShowComponent = (component) => {
        // Sempre define o estado para o componente clicado
        setActiveComponent(component);
    };

    return (
        <div className='userDataControl'>
            <div>
                <h3>Olá {currentUser.name} :)</h3>
                <h3>Esta é sua conta.</h3>
                <p>{currentUser.email}</p>
            </div>
            <div className='userDataLinks'>
                <button 
                    onClick={() => handleShowComponent('tickets')} 
                    className={`userDataBtn ${activeComponent === 'tickets' ? 'activatebtnSS' : ''}`}
                >
                    <FaTicketAlt /> Meus Ingressos
                </button>
                <button 
                    onClick={() => handleShowComponent('personalData')} 
                    className={`userDataBtn ${activeComponent === 'personalData' ? 'activatebtnSS' : ''}`}
                >
                    <FaIdCard /> Dados Pessoais
                </button>
            </div>
            <button className='userDataOutBtn'><FaSignOutAlt /> Sair</button>
        </div>
    );
}

export default UserData;
