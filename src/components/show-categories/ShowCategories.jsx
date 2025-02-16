import React, { useEffect, useState } from 'react'
import { FiChevronRight } from 'react-icons/fi';
import backend from './../../../api/index'
import { CategoriesContainer, CategoryBtn } from './styles';
import Error from '../error/Error';
import CategorySkeleton from '../skeleton-loading/category-skeleton/CategorySkeleton';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n/i18n.js';

const ShowCategories = ({ handleSetActiveCategory }) => {

    const { t } = useTranslation();

    const [activeBtn, setActiveBtn] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorServer, setErrorServer] = useState({});

    useEffect(() => {
        async function handleGetCategories() {
            try {
                const res = await backend.categoryAPI.findAll1();
                setCategories(res.data);
                setIsLoading(false)
            } catch (err) {
                setIsError(true);
                setErrorServer(err.response?.data || { status: 500, Message: t('erro-mensagem') });
            }
        }
        handleGetCategories();
    }, [])  


    const handleChangeCategory = (id) => {
        setActiveBtn(id)
        handleSetActiveCategory(id);
    }


    return (
        <>
            {isError ? (<Error code={errorServer.status} message={errorServer.Message} />) : (
                isLoading ? (<CategorySkeleton />) : 
                (
                    <CategoriesContainer>
                        {Array.isArray(categories) &&
                            categories.map(category => (
                                <CategoryBtn $active={activeBtn === category.id}
                                    key={category.id}
                                    onClick={() => handleChangeCategory(category.id)}>
                                    <FiChevronRight />{category.name}
                                </CategoryBtn>

                            ))
                        }
                    </CategoriesContainer>
                )
            )}
        </>
    )
}

export default ShowCategories