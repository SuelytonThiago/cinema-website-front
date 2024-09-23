import { useMutation } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie'

const addTicket = async ({ sessionId, price, chairNumber }) => {

    const accessToken = Cookies.get('accessToken');

    const ticket = {
        sessionId,
        price,
        chairNumber,
    };

    return await axios.post('http://localhost:8080/api/tickets/add', ticket, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    })
}

export function useTicketMutate() {
    const mutate = useMutation({
        mutationFn: addTicket,
        onSuccess: () => {
            console.log('Ticket added successfully!');
        },
        onError: (error) => {
            console.error('Error adding ticket:', error);
        }
    })

    return mutate;
}