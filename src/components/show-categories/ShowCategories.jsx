import React, { useEffect, useState } from 'react'
import { FiChevronRight } from 'react-icons/fi';
import backend from './../../../api/index'
import { toast } from 'react-toastify';
import { CategoriesContainer, CategoryBtn } from './styles';

const ShowCategories = ({handleSetActiveCategory}) => {

    const [activeBtn, setActiveBtn] = useState(null);
    const [ categories, setCategories ] = useState([]);
    

    useEffect(() => {
        async function handleGetCategories() {
            try {
                const res = await backend.categoryAPI.findAll1();
                setCategories(res.data);
            }catch(err) {
                toast.error("Erro ao buscar as categorias");
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
}

export default ShowCategories