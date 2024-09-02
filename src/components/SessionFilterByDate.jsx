import React from 'react'
import "./SessionFilterByDay.css"
import { FaTimes } from 'react-icons/fa'; 
import { useState } from 'react';

const daysOfWeek = [
    {id: 1, name: "SEG"},
    {id: 2, name: "TER"},
    {id: 3, name: "QUA"},
    {id: 4, name: "QUI"},
    {id: 5, name: "SEX"},
    {id: 6, name: "SAB"},
    {id: 7, name: "DOM"}
]

const SessionFilterByDate = ({getSessionsByDay, getSessions}) => {
    const [selectedDay ,setSelectedDay] = useState(null)

    const handleClick = (dayId) =>{
        setSelectedDay(dayId)
        getSessionsByDay(dayId)
    }

    const goToHome = () => {
        getSessions();
        setSelectedDay(null);
    }
  return (
    <div className='sessionFilterContainer'>
        {daysOfWeek.map(day => (
            <button
            className= {`btnFilter ${selectedDay === day.id ? 'selected' : ''}`}
            key={day.id}
            onClick={() => handleClick(day.id)}>
                {day.name}
            </button>
        ))}
        <button 
        className='btnFilter'
        onClick={() => goToHome()}>
            <FaTimes/>
        </button>
    </div>
  )
}

export default SessionFilterByDate;