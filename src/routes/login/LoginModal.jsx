import React from 'react';
import LoginForm from './LoginForm';
import { useDispatch } from 'react-redux';
import { hideLoginModal } from '../../redux/show-login-modal/actions';
import { FaTimes , FaUser } from 'react-icons/fa';
import { AuthenticationTab, AuthenticationTitle, Btn, Title } from './styles';
import { Overlay } from '../../components/Overlay';

const LoginModal = () => {

  const dispatch = useDispatch()
  
  const handleHideLoginModal = () => {
    dispatch(hideLoginModal())
  };

  return (
    <div>
        <Overlay></Overlay>
        <AuthenticationTab>
          <AuthenticationTitle>
            <Title>
              <FaUser />Identificação
            </Title>
            <Btn onClick={handleHideLoginModal}>
              <FaTimes/>
            </Btn>
          </AuthenticationTitle>
          <LoginForm loginSuccess={handleHideLoginModal} />
        </AuthenticationTab>
    </div>
  );
};

export default LoginModal;
