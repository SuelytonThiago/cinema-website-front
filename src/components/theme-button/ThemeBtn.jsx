import React from 'react'
import { useThemeContext } from '../../hooks/UseThemeContext.jsx';
import { Btn } from './styled.js';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeBtn = () => {

    const { theme, setTheme } = useThemeContext();

    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }

    return (
        <Btn onClick={themeToggler}>
            {theme === 'light' ?
                (<FaMoon />)
                :
                (<FaSun />)
            }
        </Btn>
    )
}

export default ThemeBtn