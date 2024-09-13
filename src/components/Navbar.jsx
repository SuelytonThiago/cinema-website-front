import { Link } from 'react-router-dom'
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { useUserData } from '../hooks/UseUserData';
import Menu from './NavbarMenu.jsx'

const Navbar = () => {
    const { data: userData } = useUserData();

    return (
        <div>
            <nav className='navbarContainer'>
                <h2>
                    <Link to={'/'}>cinemax</Link>
                </h2>
                {!userData ? (
                    <div>
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
                    </div>
                ) : (
                    <Menu user={userData}/>
                )
            }
            </nav>
        </div>
    )
}

export default Navbar