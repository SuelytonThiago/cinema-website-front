import React from 'react'
import { ModalContainer, ModalContent, ModalOverlay } from './styles';

const Modal = ({isOpen,children}) => {

    if(!isOpen) return null;

  return (
    <ModalOverlay>
        <ModalContainer>
            <ModalContent>
                {children}
            </ModalContent>
        </ModalContainer>
    </ModalOverlay>
  )
}

export default Modal