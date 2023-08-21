import { format } from 'date-fns';

export const advancedTimeConvertor = (inputTime?: string) => {
  const currentDate = new Date();
  if (inputTime) {
    const inputTimeParts = inputTime.split(':');
    const [hours, minutes] = inputTimeParts.map(Number);

    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      hours,
      minutes
    );

    const formattedDate = format(newDate, "yyyy-MM-dd'T'HH:mm:ss.SSSSSSXXX");
    return formattedDate;
  }
  const newDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    0o0,
    0o0
  );

  const formattedDate = format(newDate, "yyyy-MM-dd'T'HH:mm:ss.SSSSSSXXX");
  return formattedDate;
};

export default advancedTimeConvertor;
