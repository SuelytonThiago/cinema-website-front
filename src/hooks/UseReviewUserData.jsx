import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Cookies from 'js-cookie'

const handleReviewUserData = async (userId, movieId) => {
    const accessToken = Cookies.get('accessToken');

    const response = await axios.get(`http://localhost:8080/api/reviews/data/${userId}/${movieId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    return response?.data;
};



export function useReviewUserData(userId, movieId) {
    return useQuery({
        queryFn: () => handleReviewUserData(userId, movieId),
        queryKey: ['reviewUser-data', userId, movieId],
        enabled: !!userId && !!movieId,
    });
}
