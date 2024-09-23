import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie'

const handleAddReview = async({comment,rating,id})=> {

    const accessToken = Cookies.get('accessToken');

    const review = {
        comment: comment,
        rating: rating,
        movieId: id
    }

    console.log(review);

    return await axios.post('http://localhost:8080/api/reviews/add',review,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    })
}

export function useReviewMutation() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: handleAddReview,
        onSuccess: () => {
            queryClient.invalidateQueries(['movie-data'])
        }
    })

    return mutate;
}