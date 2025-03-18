import React, { useState } from 'react'
import InputText from '../../input-form/InputText'
import { validateCategoryName } from '../../../js/Validations.js'
import useForm from '../../../hooks/UseForm.jsx'
import backend from '../../../../api/index.ts'
import Cookies from 'js-cookie'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {  Container, Input } from './styles.js'
import { Button } from '../../Button.js'

const AddCategory = () => {

  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));
  const initialState = {
    name: '',
  }
  const { formData, handleChange, errors, setErrors, handleOnFocus } = useForm(initialState);

  const validate = () => {
    const errors = {};

    if (!validateCategoryName(formData.name)) {
      errors.name = t('validacao-nome');
    }

    return errors;
  }

  const createCategory = async () => {
    const request = {
      name: formData.name,
    }
    const validateErrors = validate();
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length === 0) {
      try {
        await backend.categoryAPI.addNewCategory(request, {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          }
        })
        toast.success(t('message-success'));
      }
      catch (err) {
        toast.error(err.response.data.Message);
      }
    }
  }

  return (
    <Container>
      <h3>Adicione uma nova categoria</h3>
      <Input>
        <InputText
          error={errors.name}
          handleChange={handleChange}
          nameInput={'name'}
          value={formData.name}
          handleOnFocus={handleOnFocus}
          placeholder={t('placeholder-digite-nome-categoria')} />

        <Button
          onClick={createCategory}>
          {t('botao-salvar')}
        </Button>
      </Input>
    </Container>
  )
}

export default AddCategory