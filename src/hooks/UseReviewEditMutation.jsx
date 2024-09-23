import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie'

const handleEditReview = async({comment,rating,id}) => {
    const newReview = {
        comment: comment,
        rating: rating,
    }

    const accessToken = Cookies.get('accessToken');

    return await axios.patch(`http://localhost:8080/api/reviews/update/${id}`, newReview, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    })
}

export function UseReviewEditMutation() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: handleEditReview,
        onSuccess: () => {
            queryClient.invalidateQueries(['movie-data']);
            queryClient.invalidateQueries(['reviewUser-data']);
        }
    })
    return mutate;
}