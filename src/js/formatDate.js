import GetDayOfWeek from './getDayOfWeek.js'

const formatDate = (date) => {
  const dayOfWeek = GetDayOfWeek(date);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return {
    dayOfWeek,
    formattedDate: `${day}/${month}`
  };
};

export default formatDate;