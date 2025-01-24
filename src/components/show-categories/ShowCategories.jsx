import React, { useState } from 'react'
import { useCategoriesData } from '../../hooks/UseCategoriesData'
import './ShowCategories.css'
import { FiChevronRight } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../../redux/category-id/actions';

const ShowCategories = () => {

    const [activeBtn, setActiveBtn] = useState(null);
    const { data: categoriesData } = useCategoriesData();
    const dispatch = useDispatch();


    const handleChangeCategory = (id) => {
        setActiveBtn(id)
        dispatch(setCategoryId(id));
        console.log(currentCategory )
        console.log(id )
    }

    return (
        <div className='categoriesContainer'>
            {Array.isArray(categoriesData) &&
                categoriesData.map(category => (
                    <button
                        key={category.id}
                        className={`categoryBtn ${activeBtn === category.id ? 'active' : ''}`}
                        onClick={() => handleChangeCategory(category.id)}>
                        <FiChevronRight />{category.name}
                    </button>
                    
                ))
            }
            
        </div>
    )
}

export default ShowCategories