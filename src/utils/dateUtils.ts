export const getDateParsed = (ISODate: string) => {
  const dateObject = new Date(ISODate);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const date = `${year}-${month}-${day}`;
  const weekday = weekdays[dateObject.getDay()];
  const time = dateObject.toLocaleTimeString();

  return { date, weekday, time };
};
