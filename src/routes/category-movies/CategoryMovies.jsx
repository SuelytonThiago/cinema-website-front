import React, { useEffect, useState } from 'react'
import ShowCategories from '../../components/show-categories/ShowCategories'
import Pagination from '../../components/pagination/Pagination'
import MovieTemplate from '../../components/movie-template/MovieTemplate'
import backend from './../../../api/index'
import Error from '../../components/error/Error'

const CategoryMovies = () => {

    const [categoryId, setCategoryId] = useState(null);
    const [movies, setMovies] = useState(null)
    const [errorServer, setErrorServer] = useState(null);

    const handleSetActiveCategory = (id) => {
        setCategoryId(id)
    }

    useEffect(() => {
        async function handleGetCategories() {
            try {
                setErrorServer(null);      
                const res = await backend.movieAPI.findByCategory(categoryId);
                setMovies(res?.data)

            } catch (err) {
                setErrorServer(err.response?.data)
            }
        }

        handleGetCategories();
    }, [categoryId])

    return (
        <>
            <ShowCategories handleSetActiveCategory={handleSetActiveCategory} />
            {errorServer ? (
                <Error code={errorServer.status} message={errorServer.Message} />
            ) : (
                movies && (
                    <Pagination objectList={movies} itemsPerPage={12} >
                        <MovieTemplate />
                    </Pagination>
                )
            )}
        </>
    );
    

}

export default CategoryMovies