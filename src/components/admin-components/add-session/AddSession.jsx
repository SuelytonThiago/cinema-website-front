import backend from '../../../../api/index'
import useForm from '../../../hooks/UseForm'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { InputContainer, InputDate } from './styles'
import { useTranslation } from 'react-i18next'
import { Button } from '../../Button'
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Container } from '../styles'
import { MessageError } from '../../Paragraph'

const AddSession = ({ MovieData, movieId }) => {

  const { t } = useTranslation();

  const initialState = {
    dateStart: '',
    dateEnd: '',
  }

  const { formData, handleChange, errors, setErrors, handleOnFocus } = useForm(initialState);

  const validate = () => {
    const errors = {};

    if (!formData.dateStart) {
      errors.dateStart = t('erro-campo-vazio')
    }

    if (!formData.dateEnd) {
      errors.dateEnd = t('erro-campo-vazio')
    }

    return errors;
  }

  const formatToCustomDateTime = (dateString) => {
    if (!dateString) return "";
    return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss a", { locale: ptBR });
  };

  const handleAddSession = async () => {
    const request = {
      name: MovieData.name,
      movieId: movieId,
      dateStart: formatToCustomDateTime(formData.dateStart),
      dateEnd: formatToCustomDateTime(formData.dateEnd),
    }

    const validateForm = validate();
    setErrors(validateForm);
    if (Object.keys(validateForm).length === 0) {
      try {
        await backend.sessionAPI.addSession(request, {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`
          }
        });
        toast.success(t('message-success'));
      } catch (err) {
        toast.error(err.response.data.Message)
      }
    }
  }

  return (
    <Container>
      <InputContainer>
      
        <InputDate
          className={errors.dateStart ? 'error' : ''}
          type="datetime-local"
          onChange={handleChange}
          name='dateStart'
          onFocus={handleOnFocus} />

        <InputDate
          className={errors.dateEnd ? 'error' : ''}
          type="datetime-local"
          onChange={handleChange}
          name='dateEnd'
          onFocus={handleOnFocus} />

      </InputContainer>
      <MessageError>{errors.dateStart}</MessageError>

      <Button onClick={handleAddSession}>
        Salvar
      </Button>

    </Container>
  )
}

export default AddSession