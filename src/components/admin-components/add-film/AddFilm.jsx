import React from 'react'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Container, Input } from './../styles.js'
import { Button } from '../../Button.js'
import useForm from '../../../hooks/UseForm.jsx';
import backend from "../../../../api/index.ts"
import Cookies from 'js-cookie'
import InputText from '../../input-form/InputText.jsx';

const AddFilm = () => {

  const { t } = useTranslation();

  const initialState = {
    name: "",
    description: "",
    releaseData: "",
    classification: "",
    imageUrl: "",
  }


  const validate = () => {
    const errors = {};

    if (!validateCategoryName(formData.name)) {
      errors.name = t('validacao-nome');
    }

    if (!validateCategoryName(formData.description)) {
      errors.description = t('validacao-description');
    }

    if (!validateCategoryName(formData.releaseData)) {
      errors.releaseData = t('validacao-releaseData');
    }

    if (!validateCategoryName(formData.classification)) {
      errors.classification = t('validacao-classification');
    }

    if (!validateCategoryName(formData.imageUrl)) {
      errors.imageUrl = t('validacao-imageUrl');
    }
    return errors;
  }

  const addMovie = async () => {
    const request = {
      name: "",
      description: "",
      releaseData: "",
      classification: "",
      imageUrl: "",
    }

    const validateErrors = validate();
    setErrors(validateErrors);
    if (Object.keys(validateErrors).length === 0) {
      try {
        await backend.movieAPI.addMovie(request , {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          }
        })

        toast.success(t('message-success'));
      } catch (err) {
        toast.error(err.response.data.Message);
      }
    }
  }



  const { formData, handleChange, errors, setErrors, handleOnFocus } = useForm(initialState);

  return (
    <Container>
      <h3>{t('add-movie')}</h3>
      <Input>

        <InputText
          error={errors.name}
          handleChange={handleChange}
          nameInput={'name'}
          value={formData.name}
          handleOnFocus={handleOnFocus}
          placeholder={t('placeholder-digite-filme-name')} />

        <InputText
          error={errors.description}
          handleChange={handleChange}
          nameInput={'description'}
          value={formData.description}
          handleOnFocus={handleOnFocus}
          placeholder={t('placeholder-digite-filme-description')} />

        <InputText
          error={errors.releaseData}
          handleChange={handleChange}
          nameInput={'releaseData'}
          value={formData.releaseData}
          handleOnFocus={handleOnFocus}
          placeholder={t('placeholder-digite-filme-releaseData')} />


      </Input>

      <Button
        onClick={addMovie}>
        {t('botao-salvar')}
      </Button>
    </Container>
  )
}

export default AddFilm