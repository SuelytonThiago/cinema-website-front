import React from 'react'
import axios from 'axios'
import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Session.css'

const Session = () => {

    const { id } = useParams();

    const [chairs, setChairs] = useState([]);

    const getChairs = async() =>{
        try{
            const response = await axios.get(`http://localhost:8080/api/chairs/${id}`)
            console.log(id)
            const data = response.data;
            setChairs(data);

        } catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getChairs();
    },[]);

    return (
        <div>
            <div className = 'sessionInformations'>
                
            </div>
            <div className='chairsContainer'>
                <div className = 'chairs'>
                    {chairs.map(chair => (
                        <button className={`chair ${chair.available === true ? 'chairAvailable' : 'chairUnavailable '}`} key={chair.id}>
                                {chair.chairNumber}
                        </button>
                    ))}
                </div>
                <div className='legendContainer'>
                    <span className='chair chairAvailable'>c</span>
                    <p> cadeira disponivel</p>
                    <span className='chair chairUnavailable'>c</span>
                    <p> cadeira disponivel</p>
                </div>
            </div>
        </div>
    )
}

export default Session