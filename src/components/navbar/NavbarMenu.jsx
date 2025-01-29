import React from 'react'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { FaTicketAlt } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import useLogout from '../../js/Logout'
import { MenuButton, MenuContainer, MenuItem, MenuItems, OutBtn } from './styles'
import { Overlay } from '../Overlay';

const menu = ({ user }) => {


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
        <MenuContainer isOpen={isOpen}>
            <MenuButton
                onClick={() => toggleMenu()}>
                <img src={user.profileImg} alt="profileImg" />
                <p>Olá, <span>{user.name}</span></p>
            </MenuButton>
            {isOpen && (
                <div>
                    <Overlay onClick={() => closeMenu()}></Overlay>
                    <MenuItems>
                        <li >
                            <MenuItem to={`/user/data/${'meus-dados'}`} onClick={() => setIsOpen(false)}>
                                <FaPen /> Meus dados
                            </MenuItem>
                        </li>
                        <li >
                            <MenuItem className='menuItem' to={`/user/data/${'meus-ingressos'}`} onClick={() => setIsOpen(false)}>
                                <FaTicketAlt /> Meus ingressos
                            </MenuItem>
                        </li>
                        <li >
                            <OutBtn
                                onClick={handleLogoutClick}>
                                <FaTimes /> Sair
                            </OutBtn>
                        </li>
                    </MenuItems>
                </div>
            )
            }
        </MenuContainer>
    )
}

export default menu