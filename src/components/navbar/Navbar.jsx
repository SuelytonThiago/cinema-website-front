import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';
import Menu from './NavbarMenu.jsx'
import { useSelector } from 'react-redux';
import { ThemeBtn } from '../Button.js';
import { FaMoon, FaSun } from 'react-icons/fa';
import { LinkBtn, SearchBtn } from '../Link.js';
import { NavbarContainer, NavbarInfo, NavbarLinks } from './styles.js';


const Navbar = ({ themeToggler, theme }) => {

    const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

    return (
        <div>
            <NavbarContainer>
                <NavbarInfo>
                    <h2>
                        <Link to={'/'}>cinemax</Link>
                    </h2>
                    {currentUser ?
                        (
                            <div >
                                <NavbarLinks>
                                    <li>
                                        <SearchBtn className='searchBtn' to={`/movies`}>
                                            <FaSearch />
                                        </SearchBtn>
                                    </li>
                                    <li>
                                        <ThemeBtn onClick={themeToggler}>
                                            {theme === 'light' ?
                                                (<FaMoon />)
                                                :
                                                (<FaSun />)
                                            }
                                        </ThemeBtn>
                                    </li>
                                    <li>
                                        <LinkBtn to={"/category-movies"} className='btn'>
                                            Filmes
                                        </LinkBtn>
                                    </li>
                                    <li className='navbarMenuContainer'>
                                        <Menu user={currentUser} />
                                    </li>
                                </NavbarLinks>
                            </div>
                        ) :
                        (
                            <div>
                                <div>
                                    <NavbarLinks>
                                        <li>
                                            <SearchBtn to={`/movies`}>
                                                <FaSearch />
                                            </SearchBtn>
                                        </li>
                                        <li>
                                            <ThemeBtn onClick={themeToggler}>
                                                {theme === 'light' ?
                                                    (<FaMoon />)
                                                    :
                                                    (<FaSun />)
                                                }
                                            </ThemeBtn>
                                        </li>
                                        <li>
                                            <LinkBtn to={"/login"} >
                                                Entrar
                                            </LinkBtn>
                                        </li>
                                        <li>
                                            <LinkBtn to={"/register"} >
                                                Criar conta
                                            </LinkBtn>
                                        </li>
                                        <li>
                                            <LinkBtn to={"/category-movies"}>
                                                Filmes
                                            </LinkBtn>
                                        </li>
                                    </NavbarLinks>
                                </div>
                            </div>
                        )
                    }
                </NavbarInfo>
            </NavbarContainer>
        </div>
    )
}

export default Navbar