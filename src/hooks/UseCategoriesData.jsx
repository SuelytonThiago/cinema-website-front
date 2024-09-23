import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const handleGetCategories = async () => {
    const response = await axios.get('http://localhost:8080/api/categories');
    return response?.data || [];
}

export function useCategoriesData() {
    return useQuery({
        queryFn: handleGetCategories,
        queryKey: ['category-data'],
    })
}