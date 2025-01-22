import React from 'react'
import StarRating from '../starRating/StarRating'
import {Link} from 'react-router-dom'
import { Button } from '../Button'

const Session = ({session}) => {
    return (
        <div className='session' key={session.id}>
            <div className='sessionImg'>
                <img src={session.imageUrl} alt={session.movieName} />
            </div>
            <div className='sessionInfoContainer'>
                <h2>{session.movieName}</h2>
                <div className='sessionInfo'>
                    <div className='details'>
                        <p>duração: {session.duration}</p>
                        <StarRating rating={session.rating} />
                    </div>
                    <div
                        className='btnSession'>
                        <Link to={`/session/${session.id}`}><Button>Comprar</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Session