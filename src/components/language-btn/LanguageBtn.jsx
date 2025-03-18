import React from 'react'
import Flag from 'react-world-flags';
import { BTN, Container } from './styles';
import '../../lib/i18n/i18n.js';
import i18next from 'i18next';

const LanguageBtn = () => {
    const language = localStorage.getItem('lang');

    const languageToggler = () => {
        const newLanguage = language === 'pt' ? 'en' : 'pt';
        localStorage.setItem('lang', newLanguage);
        window.location.reload();
    }


    return (
        <Container>
            <BTN onClick={languageToggler} >
                {language === 'pt' ? (
                    <Flag code="BR" style={{ width: 30, height: 20 }} />
                ) : (
                    <Flag code="US" style={{ width: 30, height: 20 }} />
                )}
            </BTN>
        </Container>
    )
}

export default LanguageBtn