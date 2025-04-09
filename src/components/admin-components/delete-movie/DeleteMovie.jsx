import React, { useState } from 'react'
import { Button } from '../../Button'
import { Container } from '../styles'
import { AlertMessage, PainelBtn } from './styles'
import backend from '../../../../api/index'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Modal from '../../modal/Modal'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ButtonWithCaption from '../../button-with-catpion/ButtonWithCaption'


const DeleteMovie = ({ movieId }) => {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);

    const handleSetIsOpen = () => {
        setIsOpen(!isOpen);
    }


    const handleDeleteMovie = async () => {
        try {
            await backend.movieAPI.deleteMovie(movieId, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`
                }
            })
            setIsOpen(false);
            toast.success(t('message-success'));
            navigate('/');
        }
        catch (err) {
            toast.error(err.response?.data.message);
            setIsOpen(false);
        }
    }
    return (
        <div style={{ justifyContent: 'end' }}>
            <ButtonWithCaption message={t('delete-movie')}>
                <FontAwesomeIcon icon={faTrash} color='red' onClick={handleSetIsOpen} cursor={'pointer'} />
            </ButtonWithCaption>

            {isOpen && (
                <Modal isOpen={isOpen}>
                    <Container>
                        <AlertMessage>
                            <p>{t('message-alert-delete-movie')}</p>
                            <PainelBtn>
                                <Button onClick={handleDeleteMovie}>Sim</Button>
                                <Button onClick={handleSetIsOpen}>Nao</Button>
                            </PainelBtn>
                        </AlertMessage>
                    </Container>
                </Modal>
            )}
        </div>
    )
}

export default DeleteMovie