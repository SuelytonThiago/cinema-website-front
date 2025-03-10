import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';
import Menu from './NavbarMenu.jsx'
import { useSelector } from 'react-redux';
import { LinkBtn, SearchBtn } from '../Link.js';
import { Logo, MenuResponsive, MenuResponsiveContainer, MoviesLink, NavbarContainer, NavbarInfo, NavbarLinks, NavbarLinksContainer } from './styles.js';
import ThemeBtn from '../theme-button/ThemeBtn.jsx';
import LanguageBtn from '../language-btn/LanguageBtn.jsx';
import { useTranslation } from 'react-i18next';

const Navbar = () => {

    const { t } = useTranslation();

    const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

    return (
        <div>
            <NavbarContainer>
                <NavbarInfo>
                    <h1>
                        <Logo to={'/'} >cinemax</Logo>
                    </h1>
                    <NavbarLinksContainer>
                        {currentUser ?
                            (
                                <div >
                                    <NavbarLinks>
                                        <li>
                                            <SearchBtn className='searchBtn' to={`/movies`}>
                                                <FaSearch />
                                            </SearchBtn>
                                        </li>
                                        <MoviesLink>
                                            <LinkBtn to={"/category-movies"} className='btn'>
                                                {t('link-filmes')}
                                            </LinkBtn>
                                        </MoviesLink>
                                        <li className='navbarMenuContainer'>
                                            <Menu user={currentUser} />
                                        </li>
                                    </NavbarLinks>
                                </div>
                            ) :
                            (
                                <div>
                                    <div>
                                        <NavbarLinks className='menu'>
                                            <li>
                                                <SearchBtn to={`/movies`}>
                                                    <FaSearch />
                                                </SearchBtn>
                                            </li>
                                            <li>
                                                <LanguageBtn />
                                            </li>
                                            <li>
                                                <ThemeBtn />
                                            </li>
                                            <li>
                                                <LinkBtn to={"/login"} >
                                                    {t('link-entrar')}
                                                </LinkBtn>
                                            </li>
                                            <li>
                                                <LinkBtn to={"/register"} >
                                                    {t('link-criar-conta')}
                                                </LinkBtn>
                                            </li>
                                            <MoviesLink>
                                                <LinkBtn to={"/category-movies"}>
                                                    {t('link-filmes')}
                                                </LinkBtn>
                                            </MoviesLink>
                                        </NavbarLinks>
                                    </div>
                                </div>
                            )
                        }
                    </NavbarLinksContainer>
                    <MenuResponsiveContainer>
                        <SearchBtn to={`/movies`}>
                            <FaSearch />
                        </SearchBtn>
                        <MenuResponsive>

                            <Menu user={currentUser} />
                        </MenuResponsive>
                    </MenuResponsiveContainer>

                </NavbarInfo>
            </NavbarContainer>
        </div>
    )
}

export default Navbar