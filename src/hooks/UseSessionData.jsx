import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getSessionInfo = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/sessions/info/${id}`);
    return response.data;
};

export function useSessionData(id) {
    return useQuery({
        queryFn: () => getSessionInfo(id),
        queryKey: ['session-data', id],
        enabled: !!id,
        retry: 1,
    });
}
