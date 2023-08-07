// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import dayjs from 'dayjs';

export const timeConverter = (time?: string | null) => {
  if (!time) {
    const dateTime = dayjs(`2080-10-15T00:00}`);
    const formattedDateTime = dateTime.format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
    return formattedDateTime;
  }
  const dateTime = dayjs(`2080-10-15T${time}`);
  const formattedDateTime = dateTime.format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
  return formattedDateTime;
};

export default timeConverter;
