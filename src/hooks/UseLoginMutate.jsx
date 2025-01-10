import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useUserData } from './UseUserData';
import { loginUser } from '../redux/user/actions';

const authenticateUser = async ({ email, password }) => {
    const response = await axios.post("http://localhost:8080/api/auth/login", { email, password }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return response.data;
}

export function useLoginMutate() {
    const dispatch = useDispatch();
    const mutation = useMutation({
        mutationFn: authenticateUser,
        onSuccess: async (data) => {
            Cookies.set('accessToken', data.accessToken);
            Cookies.set('refreshToken', data.refreshToken);

            const accessToken = Cookies.get('accessToken');
            const userData = await axios.get('http://localhost:8080/api/users', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            console.log(userData.data)

            if (userData.data) {
                dispatch(loginUser(userData.data));
            }
        },
        onError: (error) => {
            console.error('Erro ao autenticar:', error);
        }
    });

    return mutation;
}
