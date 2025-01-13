import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";


const handleRecoverPass = async ( email ) => {
    const response = await axios.post("http://localhost:8080/api/recover-password", null, {
        params: { 
            email: email
        }
    });

    return response?.data;
};


export function useRecoverPasswordMutate() {
    const mutation = useMutation({
        mutationFn: handleRecoverPass,
        onSuccess: (data) => {
          
            Cookies.set('accessToken', data);
            console.log(data);
        },
        onError: (error) => {  
            console.error('Erro ao autenticar:', error);
        }
    });

    return mutation;
}
