import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import StarRating from '../components/StarRating';
import './SearchPage.css'
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const getMovies = async() => {
      try{
        if(name ){
          const response = await axios.get('http://localhost:8080/api/movies/search' , {
            params: {
              name : name
            }
          });
          setMovies(response.data); 
        }
      }catch(error){
        console.log(error);
      }
    }

    getMovies();
  }, [name]);
  
  const cleanName = () =>{
    setName("");
    setMovies([]);
  }
  return (
    <div>
      <div className='inputContainer'>
        <input type="text" 
        id='search'
        name='search'
        placeholder='Buscar...'
        value = {name}
        onChange={(e) => setName(e.target.value)}
        autoComplete='off'/>
        {
          name &&  
          <button className='inputBtn' onClick={cleanName}>
            <FaTimes/>
          </button>
        }
      </div>
      <div className = 'moviesResultContainer'>
        {
          movies.map((movie) => (
            <div className="movieContainer" key={movie.id}>
              <div className="movieInfoContainer">
                <div className="movieImg">
                  <img src={movie.imageUrl} alt={movie.name} />
                </div>
                <div className="movieInfo">
                  <h2>{movie.name}</h2>
                  <StarRating rating ={movie.rating}/>
                  <Link>
                    
                  </Link>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SearchPage 