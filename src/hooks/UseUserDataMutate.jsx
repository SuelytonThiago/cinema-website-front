import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie'

const handleChangeUserData = async (formData) => {
    const access = Cookies.get("accessToken");
    return await axios.patch('http://localhost:8080/api/users/update', formData, {
        headers: {
            'Content-type': 'multipart/form-data',
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