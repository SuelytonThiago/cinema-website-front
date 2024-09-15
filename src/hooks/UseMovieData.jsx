import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMovies = async(name,page)=> {
      const response = await axios.get('http://localhost:8080/api/movies/search', {
        params: {
          name: name,
          page: page,
        }
      });
      
      return response?.data || [];
  } 


export function useMovieData(  name, page) {
    const query = useQuery({
        queryFn: () => fetchMovies(name, page),
        queryKey: ['movie-data', name, page],
        enabled: !!name && page !== undefined,
    })
    return query;
}