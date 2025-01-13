import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie'

const handleVerifyCode = async(code) => {

    const accessToken = Cookies.get('accessToken');

    return await axios.post("http://localhost:8080/api/verify-code", null, {
        params: {
            code: code
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    })
}


export function useVerifyCodeMutate() {
    const mutation = useMutation({
        mutationFn: handleVerifyCode,
    })
    return mutation;
}