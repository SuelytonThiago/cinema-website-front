import React from 'react';
import LoginForm from './LoginForm';
import { useDispatch } from 'react-redux';
import { hideLoginModal } from '../../redux/show-login-modal/actions';
import { FaTimes , FaUser } from 'react-icons/fa';
import './LoginModal.css';
const LoginModal = () => {

  const dispatch = useDispatch()
  const handleHideLoginModal = () => {
    dispatch(hideLoginModal())
  };

  return (
    <div>
        <div className='overlay'></div>
        <div className='authenticationTab'>
          <div className='authenticationTitle'>
            <div className='title'>
              <FaUser />Identificação
            </div>
            <button 
            onClick={handleHideLoginModal}
            className='xBtn'>
              <FaTimes/>
            </button>
          </div>
          <LoginForm onSuccess={handleHideLoginModal} />
        </div>
    </div>
  );
};

export default LoginModal;
