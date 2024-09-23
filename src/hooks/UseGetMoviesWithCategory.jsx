import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const handleGetMovieByCategory = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/movies/category/${id}`)
    return response?.data;
}

export function useGetMoviesWithCategory(id) {
    return useQuery({
        queryFn: () => handleGetMovieByCategory(id),
        queryKey: ['categories-data', id],
        enabled: !!id,
        retry: 1,
    });
}