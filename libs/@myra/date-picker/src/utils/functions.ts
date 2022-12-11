import { ad2bs } from './ad-bs-converter';

export const getTodayDate = () => {
  const adDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    dayOfWeek: new Date().getDay(),
  };

  const bsDate = ad2bs(adDate.year, adDate.month, adDate.day);

  return { current: null, today: new Date(), ad: adDate, bs: bsDate };
};

type DateValue = {
  date: Date;
  ad?: string;
  bs?: string;
};

export const convertValueToDate = (value: DateValue) => {
  const adDate = {
    year: value.date.getFullYear(),
    month: value.date.getMonth() + 1,
    day: value.date.getDate(),
    dayOfWeek: value.date.getDay(),
  };

  const bsDate = ad2bs(adDate.year, adDate.month, adDate.day);

  return {
    current: value.date,
    today: new Date(),
    ad: adDate,
    bs: bsDate,
  };
};
