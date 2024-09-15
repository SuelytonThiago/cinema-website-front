import React from 'react'
import { Link } from 'react-router-dom'
import './NavbarMenu.css'
import Cookie from 'js-cookie'

import {useState} from 'react'

import { FaTimes } from 'react-icons/fa'
import { FaTicketAlt } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';


const menu = ({user}) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen)
        console.log(isOpen)
    }

    const logOut = () => {
        Cookie.set('accessToken', '', {path: '/'});
        window.location.reload();
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    return (
        <div className={`menuContainer ${isOpen ? 'active' : ''}`}>
            <button 
            className='menuButton'
            onClick={() => toggleMenu()}>
                <img src={user.profileImg} alt="profileImg" />
                <p>Olá, {user.name}</p>
            </button>
            { isOpen && (
                 <div>
                    <div className='overlay' onClick={() => closeMenu()}></div>
                    <ul className='menuItems'>
                        <li >
                            <Link className='menuItem'>
                                <FaPen/> Meus dados
                            </Link>
                        </li>
                        <li >
                            <Link className='menuItem'>
                                <FaTicketAlt/> Meus ingressos  
                            </Link>
                        </li>
                        <li >
                            <button 
                            className='outBtn'
                            onClick={() => logOut()}>
                                <FaTimes/> Sair
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