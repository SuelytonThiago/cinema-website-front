import React from 'react'
import { useState } from 'react'
import { FaMoon, FaSun, FaTimes, FaBars, FaSignInAlt , FaPlusCircle   } from 'react-icons/fa'
import { FaTicketAlt } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import useLogout from '../../js/Logout'
import { MenuBtn, MenuBtnLi, MenuButton, MenuContainer, MenuItem, MenuItems, OutBtn} from './styles'
import { Overlay } from '../Overlay';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../../hooks/UseThemeContext';
import i18next from 'i18next';
import { useTheme } from 'styled-components';

const menu = ({ user }) => {

    const { theme, setTheme } = useThemeContext();

    const themeToggler = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    const language = localStorage.getItem('lang');

    const languageToggler = () => {
        const newLanguage = language === 'pt' ? 'en' : 'pt';
        localStorage.setItem('lang', newLanguage);
        i18next.changeLanguage(newLanguage);
    }

    const { t } = useTranslation();

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
                {user ? (
                    <>
                        <img src={user.profileImg} alt="profileImg" />
                        <p>{t('ola')}, <span>{user.name}</span></p>
                    </>
                ) : (
                    isOpen ? (
                        <FaTimes size={'24px'} color={useTheme().fontColor}/>
                    ) : 
                    (
                        <FaBars size={'24px'} color={useTheme().fontColor}/>
                    )
                )}
            </MenuButton>
            {isOpen && (
                <div>
                    <Overlay onClick={() => closeMenu()}></Overlay>
                    <MenuItems>
                        <MenuBtnLi>
                                <MenuBtn onClick={themeToggler}>
                                    {theme === 'light' ?
                                        (<FaMoon />)
                                        :
                                        (<FaSun />)
                                    }
                                </MenuBtn>
                                {t("tema")}
                        </MenuBtnLi>
                        <li>
                            <MenuBtnLi onClick={languageToggler}>
                                {language === 'pt' ? (
                                    <span style={{fontWeight: 'bold', fontSize: '20px'}}>🇧🇷</span>
                                ) : (
                                    <span style={{fontWeight: 'bold', fontSize: '20px'}}>🇺🇸</span>
                                )}
                                {t("linguagem")}
                            </MenuBtnLi>
                        </li>

                        {user ? (
                            <>
                                <li >
                                    <MenuItem to={`/user/data/${'meus-dados'}`} onClick={() => setIsOpen(false)}>
                                        <FaPen /> {t('meus-dados')}
                                    </MenuItem>
                                </li>
                                <li >
                                    <MenuItem className='menuItem' to={`/user/data/${'meus-ingressos'}`} onClick={() => setIsOpen(false)}>
                                        <FaTicketAlt /> {t('meus-ingressos')}
                                    </MenuItem>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <MenuItem to={"/login"} >
                                        <FaSignInAlt/>{t('link-entrar')}
                                    </MenuItem>
                                </li>
                                <li>
                                    <MenuItem to={"/register"} >
                                        <FaPlusCircle/>{t('link-criar-conta')}
                                    </MenuItem>
                                </li>
                            </>
                        )}
                        <li >
                            <OutBtn
                                onClick={handleLogoutClick}>
                                <FaTimes /> {t('sair')}
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