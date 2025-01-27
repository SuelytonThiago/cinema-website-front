import { Link } from 'react-router-dom'
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';
import Menu from './NavbarMenu.jsx'
import { useSelector } from 'react-redux';
import { Button, ThemeBtn } from '../Button';
import { FaMoon, FaSun } from 'react-icons/fa';
import { LinkBtn, SearchBtn } from '../Link.jsx';


const Navbar = ({ themeToggler, theme }) => {

    const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

    return (
        <div>
            <nav className='navbarContainer'>
                <div className='navbarInfo'>
                    <h2>
                        <Link to={'/'}>cinemax</Link>
                    </h2>
                    {currentUser ?
                        (
                            <div >
                                <ul className='navbarLinks'>
                                    <li>
                                        <SearchBtn className='searchBtn' to={`/movies`}>
                                            <FaSearch />
                                        </SearchBtn>
                                    </li>
                                    <li>
                                        <LinkBtn to={"/category-movies"} className='btn'>
                                            Filmes
                                        </LinkBtn>
                                    </li>
                                    <li className='navbarMenuContainer'>
                                        <Menu user={currentUser} />
                                    </li>
                                </ul>
                            </div>
                        ) :
                        (
                            <div>
                                <div>
                                    <ul className='navbarLinks'>
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
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                </div>
            </nav>
        </div>
    )
}

export default Navbar