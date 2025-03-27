import React from 'react';
import LoginForm from './LoginForm';
import { useDispatch } from 'react-redux';
import { hideLoginModal } from '../../redux/show-login-modal/actions';
import { FaTimes , FaUser } from 'react-icons/fa';
import { AuthenticationTab, AuthenticationTitle, Btn, H2, Title } from './styles';
import { Overlay } from '../../components/Overlay';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';

const LoginModal = () => {

  const { t } = useTranslation();

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
              <FaUser />{t('identificação')}
            </Title>
            <Btn onClick={handleHideLoginModal}>
              <FaTimes/>
            </Btn>
          </AuthenticationTitle>
          <H2>{t('erro-sessao-expirada')}</H2>
          <LoginForm loginSuccess={handleHideLoginModal} />
        </AuthenticationTab>
    </div>
  );
};

export default LoginModal;
