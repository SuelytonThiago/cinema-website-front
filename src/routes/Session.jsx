import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Session = () => {

    const { id } = useParams();
    const [session, setSession] = useState({});

    const getSessionInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/sessions/info/${id}`);
            const data = response.data;
            setSession(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSessionInfo();
    }, []);


    return (
        <div className="sessionContainer">
            {!session.movieName ? (
                <p>Carregando...</p>
            ) : (
                <div className="session">
                    <h2>{session.movieName}</h2>
                    <p>{session.duration}</p>
                    <p>{session.movieSynopsis}</p>
                    <p>{session.rating}</p>
                    <div className="commentsContainer">
                        {session.reviews.length === 0 ? (
                            <p>Nenhum Comentário</p>
                        ) : (
                            session.reviews.map((review) => (
                                <div key={review.id} className="review">
                                    <h4>{review.userName}</h4>
                                    <p>{review.rating}</p>
                                    <p>{review.comment}</p>
                                    <p>{review.date}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
            <Link className="btn">Comprar ingresso</Link>
        </div>
    )
}

export default Session