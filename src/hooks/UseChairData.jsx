import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getChairs = async (id) => {
        const response = await axios.get(`http://localhost:8080/api/chairs/${id}`);
        return response?.data;
};

export function useChairData(id) {
    return useQuery({
        queryFn: () => getChairs(id),
        queryKey: ['chair-data', id],
        enabled: !!id,
        retry: 1, 
    });
}
