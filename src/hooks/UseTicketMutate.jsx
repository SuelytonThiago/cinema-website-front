import { useMutation } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie'

const addTicket = async(data) => {

    const accessToken = Cookies.get('accessToken');
    return await axios.post('http://localhost:8080/api/tickets/add', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    })
}

export function useTicketMutate(data) {
    const mutate = useMutation({
        mutationFn: () => addTicket(data)
    })
    
    return mutate;
}