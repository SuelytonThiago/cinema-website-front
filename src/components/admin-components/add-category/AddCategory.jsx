import React, { useState } from 'react'
import InputText from '../../input-form/InputText'
import { validateCategoryName } from '../../../js/Validations.js'
import useForm from '../../../hooks/UseForm.jsx'
import backend from '../../../../api/index.ts'
import Cookies from 'js-cookie'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Container, Input, PainelBtns } from './../styles.js'
import { Button } from '../../Button.js'
import { Paragraph } from '../../Paragraph.js'
import Modal from '../../modal/Modal.jsx'

const AddCategory = () => {

  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  }

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
        setIsOpen(false);
      }
      catch (err) {
        toast.error(err.response.data.Message || err.response.data.message);
        console.log(err.response.data.message)
      }
    }
  }

  return (
    <div>
      <Paragraph onClick={handleSetIsOpen}>Adicionar uma nova categoria</Paragraph>
      {
        isOpen && (
          <Modal isOpen={isOpen}>
            <Container>
              <h3>{t('add-new-category')}</h3>
              <Input>
                <InputText
                  error={errors.name}
                  handleChange={handleChange}
                  nameInput={'name'}
                  value={formData.name}
                  handleOnFocus={handleOnFocus}
                  placeholder={t('placeholder-digite-nome-categoria')} />

                <PainelBtns>
                  <Button
                    onClick={handleSetIsOpen}>
                    {t('botao-cancelar')}
                  </Button>
                  <Button
                    onClick={createCategory}>
                    {t('botao-salvar')}
                  </Button>
                </PainelBtns>
              </Input>
            </Container>
          </Modal>
        )
      }
    </div>
  )
}

export default AddCategory