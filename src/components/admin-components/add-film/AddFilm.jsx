import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Container, Input, PainelBtns } from './../styles.js'
import { Button } from '../../Button.js'
import useForm from '../../../hooks/UseForm.jsx';
import backend from "../../../../api/index.ts"
import Cookies from 'js-cookie'
import InputText from '../../input-form/InputText.jsx';
import { validateCategoryName, validateReleaseData } from '../../../js/Validations.js';
import InputMaskComponent from '../../input-form/InputMaskComponent.jsx';
import { CategoryBtn, ClassificationBtn, ClassificationContainer, FileContainer, FileInput, Textarea, XBtn } from './styles.js';
import { MessageError, Paragraph } from '../../Paragraph.js';
import InputFile from '../../input-form/input-file/InputFile.jsx';
import Modal from '../../modal/Modal.jsx';
import ButtonWithSpinner from '../../button-with-spinner/ButtonWithSpinner.jsx';

const AddFilm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initialState = {
    name: "",
    description: "",
    releaseData: "",
  }

  const [isOpen, setIsOpen] = useState(false);

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  }


  const { t } = useTranslation();
  const { formData, handleChange, errors, setErrors, handleOnFocus } = useForm(initialState);
  const [fileImg, setFileImg] = useState(null);
  const [backgroundCover, setBackgroundCover] = useState(null);
  const [classification, setClassification] = useState('');

  const handleClassificationChange = (value) => {
    setClassification(value);
    setErrors((prevErr) => ({
      ...prevErr,
      classification: '',
    }))
  }

  const validate = () => {
    const errors = {};

    if (!validateCategoryName(formData.name)) {
      errors.name = t('validacao-nome');
    }

    if (!validateCategoryName(formData.description)) {
      errors.description = t('validacao-description');
    }

    if (!validateReleaseData(formData.releaseData)) {
      errors.releaseData = t('validacao-releaseData');
    }

    if (!classification) {
      errors.classification = t('validacao-classification');
    }

    if (!fileImg) {
      errors.fileImg = t('erro-selecione-uma-imagem');
    }

    if (!backgroundCover) {
      errors.backgroundCover = t('erro-selecione-uma-imagem');
    }

    return errors;
  }

  const addNewMovie = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const request = {
      name: formData.name,
      description: formData.description,
      releaseData: formData.releaseData,
      classification: classification,
    }

    const validateErrors = validate();
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length === 0) {

      const movie = JSON.stringify(request);

      try {
        await backend.movieAPI.addMovie(movie, fileImg, backgroundCover, {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          }
        })

        toast.success(t('message-success'));
        setIsOpen(false);
      } catch (err) {
        toast.error(err.response.data.message || err.response.data.Message);
      }
    }
    setIsLoading(false);
  }

  return (
    <div>
      <Paragraph onClick={handleSetIsOpen}>adicionar um novo filme</Paragraph>
      {isOpen && (
        <Modal isOpen={isOpen}>
          <Container>
            <h3>{t('add-movie')}</h3>
            <Input>

              <InputText
                error={errors.name}
                handleChange={handleChange}
                nameInput={'name'}
                value={formData.name}
                handleOnFocus={handleOnFocus}
                placeholder={t('placeholder-digite-nome-filme')} />

              <Textarea
                className={errors.description ? 'error' : ''}
                placeholder={t('placeholder-digite-descricao-filme')}
                value={formData.description}
                onChange={handleChange}
                onFocus={handleOnFocus}
                name='description' />
              <MessageError>{errors.description}</MessageError>

              <InputMaskComponent
                error={errors.releaseData}
                handleChange={handleChange}
                nameInput={'releaseData'}
                value={formData.releaseData}
                handleOnFocus={handleOnFocus}
                placeholder={t('placeholder-digite-data-filme')}
                mask={'99/99/9999'} />

              <InputFile
                setFile={setFileImg}
                error={errors.fileImg}
                file={fileImg}
                setErrors={setErrors}
                fileName={"fileImg"}
                h3={"Selecione uma imagem para a capa do filme"} />

              <InputFile
                setFile={setBackgroundCover}
                error={errors.backgroundCover}
                file={backgroundCover}
                setErrors={setErrors}
                fileName={"backgroundCover"}
                h3={"Selecione uma imagem para o plano de fundo do filme"} />

              <ClassificationContainer>
                <h4>{t("selecionar-classificacao")}</h4>
                <ClassificationBtn>
                  <CategoryBtn
                    className={`rating-L ${classification === 'L' ? 'activate' : ''}`}
                    onClick={() => handleClassificationChange('L')}>L</CategoryBtn>
                  <CategoryBtn
                    className={`rating-10 ${classification === '10' ? 'activate' : ''}`}
                    onClick={() => handleClassificationChange('10')}>10</CategoryBtn>
                  <CategoryBtn
                    className={`rating-12 ${classification === '12' ? 'activate' : ''}`}
                    onClick={() => handleClassificationChange('12')}>12</CategoryBtn>
                  <CategoryBtn
                    className={`rating-14 ${classification === '14' ? 'activate' : ''}`}
                    onClick={() => handleClassificationChange('14')}>14</CategoryBtn>
                  <CategoryBtn
                    className={`rating-16 ${classification === '16' ? 'activate' : ''}`}
                    onClick={() => handleClassificationChange('16')}>16</CategoryBtn>
                  <CategoryBtn
                    className={`rating-18 ${classification === '18' ? 'activate' : ''}`}
                    onClick={() => handleClassificationChange('18')}>18</CategoryBtn>
                </ClassificationBtn>
                <MessageError >{errors.classification}</MessageError>
              </ClassificationContainer>

            </Input>
            <PainelBtns>
              <Button
                onClick={handleSetIsOpen}>
                {t('botao-cancelar')}
              </Button>
              <ButtonWithSpinner isLoading={isLoading} handleRequest={addNewMovie} />
            </PainelBtns>
          </Container>
        </Modal>
      )}
    </div>

  )
}

export default AddFilm