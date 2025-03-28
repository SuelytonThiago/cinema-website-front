import React, { useState }  from 'react'
import { AlertMessage, Container, PainelBtn } from './styles';
import backend from '../../../api/index'
import Cookies from 'js-cookie'
import Modal from '../modal/Modal';
import { Button } from '../Button';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const DeleteComment = ({ reviewId }) => {

  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  }

  const handleDeleteComment = async () => {
    try {
      await backend.reviewsAPI.deleteReview(reviewId, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      })
      setIsOpen(false);
      toast.success(t('message-success'));
    }
    catch (err) {
      toast.error(err.response?.data.message);
      setIsOpen(false);
    }
  }

  return (
    <div>
      <p style={{color: 'red',fontSize: '13px'}} onClick={handleSetIsOpen}>Excluir</p>
      {isOpen && (
        <Modal isOpen={isOpen}>
          <Container>
            <AlertMessage>
              <p style={{textAlign: 'center'}}>{t('message-alert-delete-comment')}</p>
              <PainelBtn>
                <Button onClick={handleDeleteComment}>Sim</Button>
                <Button onClick={handleSetIsOpen}>Nao</Button>
              </PainelBtn>
            </AlertMessage>
          </Container>
        </Modal>
      )}
    </div>
  )
}

export default DeleteComment