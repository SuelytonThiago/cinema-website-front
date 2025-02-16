import React from 'react'
import Flag from 'react-world-flags';
import { BTN, Container } from './styles';
import '../../lib/i18n/i18n.js';

const LanguageBtn = () => {
    const language = localStorage.getItem('lang');

    const languageToggler = () => {
        language === 'pt' ? localStorage.setItem('lang', 'en') : localStorage.setItem('lang', 'pt');
        window.location.reload();   
    }


    return (
        <Container>
            <BTN onClick={languageToggler} >
                {language === 'pt' ? (
                    <Flag code="US" style={{ width: 30, height: 20 }}/>
                ) : (
                    <Flag code="BR" style={{ width: 30, height: 20 }}/>
                )}
            </BTN>
        </Container>
    )
}

export default LanguageBtn