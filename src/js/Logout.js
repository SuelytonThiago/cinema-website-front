import Cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/user/actions';

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        Cookie.remove('accessToken');
        Cookie.remove('refreshToken');
        dispatch(logoutUser());
        navigate('/');
    };

    return logout;
};

export default useLogout;
