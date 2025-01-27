import React, { useEffect, useState } from 'react'
import ShowCategories from '../../components/show-categories/ShowCategories'
import Pagination from '../../components/pagination/Pagination'
import MovieTemplate from '../../components/movie-template/MovieTemplate'
import backend from './../../../api/index'
import { toast } from 'react-toastify'

const CategoryMovies = () => {

    const [categoryId, setCategoryId] = useState(null);
    const [movies, setMovies] = useState([])
    
    const handleSetActiveCategory = (id) => {
        setCategoryId(id)
    }

    useEffect(() => {
        async function handleGetCategories() {
            try {
                const res = await backend.movieAPI.findByCategory(categoryId);
                setMovies(res.data)

            } catch(err) {
                toast.error(err.response.data.Message)
            }
        }

        handleGetCategories();
    }, [categoryId])


    return (
        <div>
            <ShowCategories handleSetActiveCategory={handleSetActiveCategory} />
            {!!movies &&
                <Pagination objectList={movies} itemsPerPage={12}>
                    <MovieTemplate />
                </Pagination>}
        </div>
    )
}

export default CategoryMovies