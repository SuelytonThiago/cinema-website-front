import React from 'react'
import { Container, Input } from '../styles'
import InputText from '../../input-form/InputText'
import useForm from '../../../hooks/UseForm'
import backend from '../../../../api/index.ts'
import { validateCategoryName } from '../../../js/Validations'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next';

const AddCategoryToMovie = ({ movieId }) => {

    const { t } = useTranslation();

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

    const addCategoryToFilme = async () => {
        const request = {
            movieId: movieId,
            categoryName: formData.name.trim().toLowerCase(),
        }
        const validateErrors = validate();
        setErrors(validateErrors);

        if (Object.keys(validateErrors).length === 0) {
            try {
                await backend.movieAPI.addCategoryToFilm(request, {
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
            <h4>{t('add-new-category-to-movie')}</h4>
            <Input>
                <InputText
                    error={errors.name}
                    handleChange={handleChange}
                    nameInput={'name'}
                    value={formData.name}
                    handleOnFocus={handleOnFocus}
                    placeholder={t('placeholder-digite-nome-categoria')} />
            </Input>
            <Button
                onClick={addCategoryToFilme}>
                {t('botao-salvar')}
            </Button>
        </Container>
    )
}

export default AddCategoryToMovie