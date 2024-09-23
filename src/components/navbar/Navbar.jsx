import { Link } from 'react-router-dom'
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';
import Menu from './NavbarMenu.jsx'
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);

    return (
        <div>
            <nav className='navbarContainer'>
                <div className='navbarInfo'>
                    <h2>
                        <Link to={'/'}>cinemax</Link>
                    </h2>
                    {!currentUser ?
                        (
                            <div>
                                <div>
                                    <ul className='navbarLinks'>
                                        <li>
                                            <Link className='searchBtn' to={`/movies`}>
                                                <FaSearch />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={"/login"} className='btn'>
                                                Entrar
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={"/register"} className='btn'>
                                                Criar conta
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={"/category-movies"} className='btn'>
                                                Filmes
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) :
                        (
                            <div >
                                <ul className='navbarLinks'>
                                    <li>
                                        <Link className='searchBtn' to={`/movies`}>
                                            <FaSearch />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/category-movies"} className='btn'>
                                            Filmes
                                        </Link>
                                    </li>
                                    <li className='navbarMenuContainer'>
                                        <Menu user={currentUser} />
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                </div>
            </nav>
        </div>
    )
}

export default Navbar