import React, { useEffect, useState } from 'react'
import { FiChevronRight } from 'react-icons/fi';
import backend from './../../../api/index'
import { toast } from 'react-toastify';
import { CategoriesContainer, CategoryBtn } from './styles';

const ShowCategories = ({handleSetActiveCategory}) => {

    const [activeBtn, setActiveBtn] = useState(null);
    const [ categories, setCategories ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorServer, setErrorServer] = useState({});

    useEffect(() => {
        async function handleGetCategories() {
            try {
                const res = await backend.categoryAPI.findAll1();
                setCategories(res.data);
                setIsLoading(false)
            }catch(err) {
                setErrorServer(err.response.data);
            }
        }

        handleGetCategories();
    }, [])


    const handleChangeCategory = (id) => {
        setActiveBtn(id)
        handleSetActiveCategory(id);
    }

    if(!categories) {
        return <div>Buscando categorias</div>
    }

    return (
        <CategoriesContainer className={isLoading ? 'loading' : ''}>
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
}

export default ShowCategories