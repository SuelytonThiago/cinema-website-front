import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMovies = async (name) => {
  const response = await axios.get('http://localhost:8080/api/movies/search', {
    params: {
      name: name
    }
  });

  return response?.data || [];
}


export function useMovieData(name) {
  const query = useQuery({
    queryFn: () => fetchMovies(name),
    queryKey: ['movies-data', name],
    enabled: !!name,
  })
  return query;
}