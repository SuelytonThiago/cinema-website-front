const getDayOfWeek = (date) => {
  const daysOfWeek = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];
  return daysOfWeek[date.getDay()];
};

export default getDayOfWeek;
