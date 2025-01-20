import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { AiOutlineClose } from 'react-icons/ai';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/');
  };

  return (
    <div className='sigContainer'>
      <button class="crossBtn"> <Link to={'/'}><AiOutlineClose/></Link></button>
      <div className='signinContainer'>
        <LoginForm loginSuccess={handleLoginSuccess} />
      </div>

      <div className='backImg'>
        <img src="https://minhas-imagens-2025.s3.sa-east-1.amazonaws.com/background.jpg" alt="cine" />
      </div>
    </div>
  );
};

export default Login;
