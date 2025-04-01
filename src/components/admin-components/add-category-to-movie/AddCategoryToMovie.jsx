import React, { useEffect, useState } from 'react'
import { Container, Input, Li, ListBtn, ListItemsContainer, P, PainelBtns } from '../styles'
import InputText from '../../input-form/InputText'
import useForm from '../../../hooks/UseForm'
import backend from '../../../../api/index.ts'
import { validateCategoryName } from '../../../js/Validations'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { Button } from '../../Button'
import { useTranslation } from 'react-i18next';
import { FaExclamationCircle, FaPlus } from 'react-icons/fa';
import Modal from '../../modal/Modal'
import ButtonWithCaption from '../../button-with-catpion/ButtonWithCaption.jsx'
import LoadingSpinner from '../../loading/loading-spinner/LoadingSpinner.jsx'

const AddCategoryToMovie = ({ movieId }) => {

    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isCategorySelected, setIsCategorySelected] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


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

    const handleSelectCategory = (category) => {
        handleChange({ target: { name: "name", value: category } });
        setCategories([]);
        setIsCategorySelected(true);
    }

    const addCategoryToFilme = async () => {
        setIsLoading(true);
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
                setIsOpen(false);
            } catch (err) {
                toast.error(err.response.data.Message);
            }
        }
        setIsLoading(false);
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
                console.log(formData.name);
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
        <div>
            <ButtonWithCaption message={t('add-new-category')}>
                <FaPlus onClick={handleSetIsOpen} cursor={'pointer'} size={'10px'} color='#1877F2' />
            </ButtonWithCaption>
            {isOpen && (
                <Modal isOpen={isOpen}>
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

                        <ListItemsContainer style={{ top: '63%', left: '50%' }}>
                            <ul>
                                {
                                    error ? (<P>{t('erro-buscar-categorias')} <FaExclamationCircle /></P>) :
                                        categories.map((cat, index) => (
                                            <Li key={index}>
                                                <ListBtn onClick={() => handleSelectCategory(cat.name)}>
                                                    {cat.name}
                                                </ListBtn>
                                            </Li>
                                        ))
                                }
                            </ul>

                        </ListItemsContainer>
                        <PainelBtns>
                            <Button onClick={handleSetIsOpen}>
                                {t('botao-cancelar')}
                            </Button>
                            <Button
                                className={isLoading && 'loading'}
                                onClick={addCategoryToFilme}
                                disabled={isLoading}>
                                {isLoading ? (
                                    <LoadingSpinner />
                                ) : (
                                    t('botao-salvar')
                                )}
                            </Button>
                        </PainelBtns>
                    </Container>
                </Modal>

            )}
        </div>


    )
}

export default AddCategoryToMovie