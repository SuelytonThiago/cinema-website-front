import {useState} from 'react'

const useForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value
            };
        });
    }

    const handleOnFocus = (e) => {
        const {name} = e.target;
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name] : ''
        }));
    }

   

    return {formData, handleChange, handleOnFocus, errors, setErrors}
}

export default useForm;