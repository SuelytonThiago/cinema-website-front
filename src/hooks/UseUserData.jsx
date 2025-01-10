import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const getUserData = async ({queryKey}) => {
    const accessToken = queryKey[1]
    const response = await axios.get('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    return response?.data;
}

export function useUserData(accessToken) {
    const query = useQuery({
        queryFn: getUserData,
        queryKey: ['user-data', accessToken],
        enabled: !!accessToken,
    })
    return query;
}