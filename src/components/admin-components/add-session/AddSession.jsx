import React, { useEffect, useState } from 'react'
import backend from '../../../../api/index'
import useForm from '../../../hooks/UseForm'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

const AddSession = () => {

  const [movie, setMovie] = useState({});
  const [movies, setMovies] = useState([]);
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const initialState = {
    name: '',
    movieId: '',
    dateStart: '',
    dateEnd: '',
  }

  const { formData, handleChangle, errors, setErrors, handleOnFocus } = useForm(initialState);

  const handleAddSession = async () => {
    try {
      await backend.sessionAPI.addSession(formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
    } catch (err) {
      toast.error(err.response.data.Message)
    }
  }

  useEffect(() => {
    setServerError(null);
    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      if (formData.name.trim()) {
        try {
          const res = await backend.movieAPI.search(formData.name);
          setMovies(res.data);
          setIsLoading(false);
        } catch (err) {
          setServerError(err.response.data);
        }
      }
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [formData.name]);

  return (
    <div>
      <input type="search" />
      <input type="date" />
      <input type="date" />
      
      <button onClick={handleAddSession}>
        Salvar
      </button>
    </div>
  )
}

export default AddSession