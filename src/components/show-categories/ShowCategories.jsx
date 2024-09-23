import React, { useState } from 'react'
import { useCategoriesData } from '../../hooks/UseCategoriesData'
import './ShowCategories.css'
import { FiChevronRight } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../../redux/category-id/actions';

const ShowCategories = () => {

    const { data: categoriesData } = useCategoriesData();
    const dispatch = useDispatch();
    const id = null;


    const handleChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    return (
        <div className='categoriesContainer'>
            {Array.isArray(categoriesData) &&
                categoriesData.map(category => (
                    <button
                        key={category.id}
                        className='categoryBtn'
                        onClick={() => handleChangeCategory(category.id)}>
                        <FiChevronRight />{category.name}
                    </button>
                ))
            }
        </div>
    )
}

export default ShowCategories