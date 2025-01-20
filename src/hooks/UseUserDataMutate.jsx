import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie'

const handleChangeUserData = async ({formData, password}) => {
    const access = Cookies.get("accessToken");
    return await axios.put('http://localhost:8080/api/users/update', formData, {
        params : {
            password: password
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`,
        }
    });
};



export function useUserDataMutation() {
    const mutation = useMutation({
        mutationFn: handleChangeUserData,
    })

    return mutation;
}