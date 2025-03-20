import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Container, Input } from './../styles.js'
import { Button } from '../../Button.js'
import useForm from '../../../hooks/UseForm.jsx';
import backend from "../../../../api/index.ts"
import Cookies from 'js-cookie'
import InputText from '../../input-form/InputText.jsx';
import { validateCategoryName, validateReleaseData } from '../../../js/Validations.js';
import InputMaskComponent from '../../input-form/InputMaskComponent.jsx';
import { CategoryBtn, ClassificationBtn, ClassificationContainer, FileContainer, FileInput, Textarea, XBtn } from './styles.js';
import { MessageError } from '../../Paragraph.js';
import { FaFileAlt, FaImage, FaTimes } from "react-icons/fa"; // Importando ícones

const AddFilm = () => {

  const initialState = {
    name: "",
    description: "",
    releaseData: "",
  }
  const fileInputRef = useRef(null);
  const { t } = useTranslation();
  const { formData, handleChange, errors, setErrors, handleOnFocus } = useForm(initialState);
  const [file, setFile] = useState(null);
  const [classification, setClassification] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrors((prevErr) => ({
      ...prevErr,
      file: '',
    }))
  };

  const handleClassificationChange = (value) => {
    setClassification(value);
    setErrors((prevErr) => ({
      ...prevErr,
      classification: '',
    }))
  }

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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

    if (!file) {
      errors.file = t('erro-selecione-uma-imagem');
    }

    return errors;
  }

  const addNewMovie = async (e) => {
    e.preventDefault();

    const request = {
      name: formData.name,
      description: formData.description,
      releaseData: formData.releaseData,
      classification: classification,
    }

    console.log(request)

    const validateErrors = validate();
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length === 0) {

      const movie = JSON.stringify(request);

      console.log(movie);
      try {
        await backend.movieAPI.addMovie(movie, file, {
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

        <FileInput htmlFor="fileUpload">
          {errors.file || t("selecione-um-arquivo")}
        </FileInput>
        <input
          id="fileUpload"
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange} />

        {file && (
          <FileContainer>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              {file.type.startsWith("image/") ? (
                <FaImage size={20} color="#007BFF" />
              ) : (
                <FaFileAlt size={20} color="#333" />
              )}
              <span>{file.name}</span>
            </div>
            <XBtn onClick={clearFile}>
              <FaTimes />
            </XBtn>
          </FileContainer>
        )}



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
      <Button
        onClick={addNewMovie}>
        {t('botao-salvar')}
      </Button>
    </Container>
  )
}

export default AddFilm