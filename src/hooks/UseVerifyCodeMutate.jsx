import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie'

const handleVerifyCode = async ({code,email}) => {

    const response =  await axios.post("http://localhost:8080/api/verify-code", null, {
        params: {
            code: code,
            email: email
        },
    })

    return response?.data;
}


export function useVerifyCodeMutate() {
    const mutation = useMutation({
        mutationFn: handleVerifyCode,
        onSuccess: (data) => {
            Cookies.set('accessToken', data);
        },
        onError: (error) => {
            console.error('Erro ao enviar email:', error);
        }
    })
    return mutation;
}