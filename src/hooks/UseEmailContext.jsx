import { useContext } from "react";
import { EmailContext } from "../context/EmailContext";

export const useEmailContext = () => {
    return useContext(EmailContext);
}