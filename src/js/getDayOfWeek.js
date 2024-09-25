const getDayOfWeek = (dateString) => {
  const date = new Date(dateString)
  const daysOfWeek = [ 'DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
  return daysOfWeek[date.getDay()];
};

export default getDayOfWeek;
