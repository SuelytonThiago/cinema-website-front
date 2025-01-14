import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
  return (
    <div className="auth-container">
       <ToastContainer />
      <Outlet />
    </div>
  );
};

export default AuthLayout;