import { Link } from 'react-router-dom'
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';
import { useUserData } from '../../hooks/UseUserData.jsx';
import Menu from './NavbarMenu.jsx'

const Navbar = () => {
    const { data: userData } = useUserData();

    return (
        <div>
            <nav className='navbarContainer'>
                <div className='navbarInfo'>
                    <h2>
                        <Link to={'/'}>cinemax</Link>
                    </h2>
                    {!userData ? 
                        (
                            <div>
                                <div>
                                    <ul className='navbarLinks'>
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
                        ) : 
                        (   
                            <div >
                                <ul className='navbarLinks'>
                                    <li>
                                        <Link className='searchBtn' to={`/movies`}>
                                            <FaSearch/> 
                                        </Link>
                                    </li>
                                    <li className='navbarMenuContainer'>
                                        <Menu user={userData} />
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