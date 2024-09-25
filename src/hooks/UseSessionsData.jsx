import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getSessions = async () => {
    const response = await axios.get("http://localhost:8080/api/sessions");

    return response?.data || [];


}

export function useSessionsData() {
    return useQuery({
        queryFn: getSessions,
        queryKey: ['sessions-data'],
    })
}