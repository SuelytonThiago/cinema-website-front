import React from 'react'
import { FaExclamationCircle } from 'react-icons/fa';
import { Container } from './styles';

const Error = ({code, message}) => {
  return (
    <Container>
        <FaExclamationCircle size={40} color="red" />
        <p>{code}</p>
        <p>{message}</p>
    </Container>
    
  )
}

export default Error