import React from 'react'
import LoadingSpinner from '../loading/loading-spinner/LoadingSpinner'
import { useTranslation } from 'react-i18next';
import { Button } from '../Button';

const ButtonWithSpinner = ({isLoading ,handleRequest}) => {

     const { t } = useTranslation();

    return (
        <Button
            className={isLoading && 'loading'}
            onClick={handleRequest}
            disabled={isLoading}>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                t('botao-salvar')
            )}
        </Button>
    )
}

export default ButtonWithSpinner