import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";


const handleCreatePass = async ( {oldPassword, newPassword} ) => {

    const access = Cookies.get("accessToken");

    const response = await axios.put("http://localhost:8080/api/users/update-password", null, {
        params: { 
            oldPassword: oldPassword,
            newPassword: newPassword
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`,
        },
    });

    return response?.data;
};


export function useCreateNewPasswordMutate() {
    const mutation = useMutation({
        mutationFn: handleCreatePass,
    });

    return mutation;
}
