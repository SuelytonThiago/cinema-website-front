import { Link } from 'react-router-dom'
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';

const Navbar = () => {

    return (
        <div>
            <nav className='navbarContainer'>
                <h2>
                    <Link to={'/'}>cinemax</Link>
                </h2>
                <div >
                    <div className='navbarLinks'>
                        <ul>
                            <li>
                                <Link className='searchBtn' to={`/movies`}>
                                    <FaSearch/> 
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
                        </ul>
                    </div>
                    <div className = 'navBarInfoRespContainer'>
                        <Link className='searchBtn' to={`/movies`}>
                            <FaSearch/> 
                        </Link>
                        <div className='mobileMenu'>
                            <ul>
                                <li>Entrar</li>
                                <li>Criar conta</li>
                            </ul>
                            <FiUser className='userIcon'/>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar