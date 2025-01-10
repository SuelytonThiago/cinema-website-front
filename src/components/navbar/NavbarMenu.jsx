import React from 'react'
import { Link } from 'react-router-dom'
import './NavbarMenu.css'
import Cookie from 'js-cookie'

import { useState } from 'react'

import { FaTimes } from 'react-icons/fa'
import { FaTicketAlt } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/user/actions'

import { useNavigate } from 'react-router-dom'
import useLogout from '../../js/Logout'


const menu = ({ user }) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    const logout = useLogout();

    const handleLogoutClick = () => {
        logout();
    };


    return (
        <div className={`menuContainer ${isOpen ? 'active' : ''}`}>
            <button
                className='menuButton'
                onClick={() => toggleMenu()}>
                <img src={user.profileImg} alt="profileImg" />
                <p>Olá, {user.name}</p>
            </button>
            {isOpen && (
                <div>
                    <div className='overlay' onClick={() => closeMenu()}></div>
                    <ul className='menuItems'>
                        <li >
                            <Link className='menuItem' to={`/user/data/${'meus-dados'}`} onClick={() => setIsOpen(false)}>
                                <FaPen /> Meus dados
                            </Link>
                        </li>
                        <li >
                            <Link className='menuItem' to={`/user/data/${'meus-ingressos'}`} onClick={() => setIsOpen(false)}>
                                <FaTicketAlt /> Meus ingressos
                            </Link>
                        </li>
                        <li >
                            <button
                                className='outBtn'
                                onClick={handleLogoutClick}>
                                <FaTimes /> Sair
                            </button>
                        </li>
                    </ul>
                </div>
            )
            }
        </div>
    )
}

export default menu