const formatHours = ( date ) => { 
    const hours = String(date.getHours()).padStart(2,'0');
    const minutes = String(date.getMinutes()).padStart(2,'0');
  
    const timeString = `${hours}:${minutes}`;
  
    return timeString;
}

export default formatHours;