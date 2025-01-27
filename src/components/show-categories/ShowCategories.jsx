import React, { useEffect, useState } from 'react'
import './ShowCategories.css'
import { FiChevronRight } from 'react-icons/fi';
import backend from './../../../api/index'
import { toast } from 'react-toastify';

const ShowCategories = ({handleSetActiveCategory}) => {

    const [activeBtn, setActiveBtn] = useState(null);
    const [ categories, setCategories ] = useState([]);
    

    useEffect(() => {
        async function handleGetCategories() {
            try {
                const res = await backend.categoryAPI.findAll1();
                setCategories(res.data);
                console.log(categories)
            }catch(err) {
                toast.error("Erro ao buscar as categorias");
                console.log(err)
            }
        }

        handleGetCategories();
    }, [])


    const handleChangeCategory = (id) => {
        setActiveBtn(id)
        handleSetActiveCategory(id);
    }

    return (
        <div className='categoriesContainer'>
            {Array.isArray(categories) &&
                categories.map(category => (
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