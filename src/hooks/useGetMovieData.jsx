import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const getMovieInfo = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/movies/${id}`);
    return response?.data;

}


export function useGetMovieData(id) {
    const query = useQuery({
        queryFn: () => getMovieInfo(id),
        queryKey: ['movie-data', id],
        enabled: !!id,
    })

    return query;
}