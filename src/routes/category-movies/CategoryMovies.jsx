import React, { useState } from 'react'
import ShowCategories from '../../components/show-categories/ShowCategories'
import { useGetMoviesWithCategory } from '../../hooks/UseGetMoviesWithCategory'
import { useSelector } from 'react-redux'
import Pagination from '../../components/pagination/Pagination'
import MovieTemplate from '../../components/movie-template/MovieTemplate'

const CategoryMovies = () => {
    const { currentCategoryId } = useSelector((rootReducer) => rootReducer.categoryReducer);
    const { data: categoryMoviesData } = useGetMoviesWithCategory(currentCategoryId)


    return (
        <div>
            <ShowCategories />
            {!!categoryMoviesData &&
                <Pagination objectList={categoryMoviesData} itemsPerPage={12}>
                    <MovieTemplate />
                </Pagination>}
        </div>
    )
}

export default CategoryMovies