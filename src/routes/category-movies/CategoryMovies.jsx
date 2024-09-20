import React, {useState} from 'react'
import ShowCategories from '../../components/show-categories/ShowCategories'
import { useGetMoviesWithCategory } from '../../hooks/UseGetMoviesWithCategory'
import { useSelector } from 'react-redux'
import MovieTemplate from '../../components/movie-template/MovieTemplate'
import Pagination from '../../components/pagination/Pagination'

const CategoryMovies = () => {

    const {currentCategoryId} = useSelector((rootReducer) => rootReducer.categoryReducer);
    const {data: categoryMoviesData} = useGetMoviesWithCategory(currentCategoryId)

    return (
        <div>
            <ShowCategories/>
            {!!categoryMoviesData && <Pagination objectList={categoryMoviesData}/>}
        </div>
    )
}

export default CategoryMovies