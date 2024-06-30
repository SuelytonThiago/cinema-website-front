import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';

const Navbar = () => {
    return (
        <div>
            <nav className='navbarContainer'>
                <h2>
                    <Link to={'/'}>cinemax</Link>
                </h2>
                <ul>
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
            </nav>
        </div>
    )
}

export default Navbar