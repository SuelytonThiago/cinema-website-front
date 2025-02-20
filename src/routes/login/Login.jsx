import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { AiOutlineClose } from 'react-icons/ai';
import { CrossBtn } from '../../components/Button';
import { BackImg, SigContainer, SigninContainer } from './styles';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/');
  };

  return (
    <SigContainer>

      <SigninContainer>
        <CrossBtn to={'/'}><AiOutlineClose /></CrossBtn>
        <LoginForm loginSuccess={handleLoginSuccess} />
      </SigninContainer>

      <BackImg>
        <img src="https://minhas-imagens-2025.s3.sa-east-1.amazonaws.com/background.jpg" alt="cine" />
      </BackImg>
    </SigContainer>
  );
};

export default Login;
