import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const getSessionsByMovie = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/sessions/movie/${id}`);
    return response?.data || [];
}


export function useSessionsByMovie(id) {
    return useQuery({
        queryKey: ['sessions-movie-data', id],
        queryFn: () => getSessionsByMovie(id), 
        enabled: !!id 
    });
}
