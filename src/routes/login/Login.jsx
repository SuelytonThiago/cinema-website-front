import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/');
  };

  return (
    <div className='signinContainer'>
      <LoginForm onSuccess={handleLoginSuccess} />
    </div>
  );
};

export default Login;
