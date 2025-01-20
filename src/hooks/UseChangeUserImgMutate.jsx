import { useMutation } from "@tanstack/react-query";
import Cookies from 'js-cookie'
import axios from 'axios';

const handleChangeUserImg = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {

        const access = Cookies.get("accessToken");

        const response = await axios.post("http://localhost:8080/api/files/upload", formData, {
            headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': `Bearer ${access}`,
            },
        });

        return response?.data

    } catch (error) {
        throw new Error(error.response?.data?.message || "Erro ao fazer  upload da imagem")
    }
}


export function useChangeUserImgMutate() {
    return useMutation({
        mutationFn: handleChangeUserImg
    });
}
