import { useQuery } from "@tanstack/react-query";
import Cookies from 'js-cookie';
import axios from "axios";


const getUserData = async() => {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.get('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    return response?.data;
}

export function useUserData() {
    const query = useQuery({
        queryFn: getUserData,
        queryKey: ['user-data'],
        retry: false,
    })
    return query;
}