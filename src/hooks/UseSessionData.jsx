// src/hooks/useSessionData.js

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Função para buscar as informações da sessão
const getSessionInfo = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/sessions/info/${id}`);
    return response.data;
};

// Hook customizado para buscar os dados da sessão
export function useSessionData(id) {
    return useQuery({
        queryFn: () => getSessionInfo(id),
        queryKey: ['session-data', id],
        enabled: !!id,  // Só faz a requisição se o id estiver definido
        retry: 1,       // Tenta novamente em caso de falha
    });
}
