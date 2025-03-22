import React, { useEffect, useState } from 'react'
import { Container, Input } from '../styles'
import InputText from '../../input-form/InputText'
import useForm from '../../../hooks/UseForm'
import backend from '../../../../api/index.ts'
import { validateCategoryName } from '../../../js/Validations'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next';
import { CategoriesContainer, CategoryBtn, Li, P } from './styles.js'
import Error from '../../error/Error.jsx'
import { FaExclamationCircle } from 'react-icons/fa';

const AddCategoryToMovie = ({ movieId }) => {

    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isCategorySelected, setIsCategorySelected] = useState(false);

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

    const handleSelectCategory = (category) => {
        handleChange({ target: { name: "name", value: category } });
        setCategories([]);
        setIsCategorySelected(true);
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

    useEffect(() => {

        if (isCategorySelected) {
            setIsCategorySelected(false);
            return;
        }
        const timeoutId = setTimeout(async () => {
            setCategories([]);
            setError(null);

            if (formData.name.trim()) {
                try {
                    const response = await backend.categoryAPI.findLikeName(formData.name, {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('accessToken')}`
                        }
                    })
                    setCategories(response?.data);

                } catch (err) {
                    setError(err.response?.data || {});
                    setCategories([]);
                }
            }
        }, 600);

        return () => clearTimeout(timeoutId);
    }, [formData.name]);



    return (
        <Container style={{ position: 'relative', paddingBottom: '10px' }}>
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

            <CategoriesContainer>
                <ul>
                    {
                    error ? (<P>{t('erro-buscar-categorias')} <FaExclamationCircle/></P>) :
                        categories.map((cat, index) => (
                            <Li key={index}>
                                <CategoryBtn onClick={() => handleSelectCategory(cat.name)}>
                                    {cat.name}
                                </CategoryBtn>
                            </Li>
                        ))
                    }
                </ul>

            </CategoriesContainer>

            <Button onClick={addCategoryToFilme}>
                {t('botao-salvar')}
            </Button>
        </Container>


    )
}

export default AddCategoryToMovie