import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie'

const handleChangePassword = async(password) => {
    const accessToken = Cookies.get('accessToken');

    return await axios.post("http://localhost:8080/api/users/change-password", {
        params: {
            password: password
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    })
}

export function useChangePasswordMutate() {
    const mutation = useMutation({
        mutationFn: handleChangePassword,
    })
    return mutation
}