export const readableTimeParser = (dateString: string) => {
  // Create a new Date object from the string
  const date = new Date(dateString);

  // Extract the components of the date
  // const year = date.getFullYear();
  // const month = `0${date.getMonth() + 1}`.slice(-2); // Months are zero-based
  // const day = `0${date.getDate()}`.slice(-2);
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  // const seconds = (`0${  date.getSeconds()}`).slice(-2);

  return `${hours}:${minutes}`;
};
