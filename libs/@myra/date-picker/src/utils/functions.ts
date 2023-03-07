import dayjs from 'dayjs';
import NepaliDate from 'nepali-date-converter';

import { ad2bs, bs2ad, EachBSYear } from './ad-bs-converter';
import { zeroPad } from './calendar-builder';
import { calendarData } from './constants';
import { CalendarBuilderDate } from '../types/date';

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
  date?: Date;
  ad?: string;
  bs?: string;
};

export const convertValueToDate = (value: DateValue) => {
  if (value.ad) {
    const adJSDate = new Date(value?.ad);
    const adDate = {
      year: adJSDate.getFullYear(),
      month: adJSDate.getMonth() + 1,
      day: adJSDate.getDate(),
      dayOfWeek: adJSDate.getDay(),
    };

    const bsDate = ad2bs(adDate.year, adDate.month, adDate.day);

    return {
      current: adJSDate,
      today: new Date(),
      ad: adDate,
      bs: bsDate,
    };
  }

  if (value.bs) {
    const bsJSDate = new NepaliDate(value?.bs);
    const bsDate = {
      year: bsJSDate.getYear(),
      month: bsJSDate.getMonth() + 1,
      day: bsJSDate.getDate(),
      dayOfWeek: bsJSDate.getDay(),
    };

    const adDate = bs2ad(bsDate.year, bsDate.month, bsDate.day);
    const adJSDate = new Date(adDate.year, adDate.month - 1, adDate.day);

    return {
      current: adJSDate,
      today: new Date(),
      ad: adDate,
      bs: bsDate,
    };
  }

  if (value.date) {
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
  }

  return null;
};

export const convertDate = (
  calendarDate: CalendarBuilderDate | null,
  calendarType: 'AD' | 'BS' = 'AD'
) => {
  if (!calendarDate) return null;

  if (calendarType === 'BS') {
    const _adDate = bs2ad(calendarDate.year, +calendarDate.month, +calendarDate.day);
    const dateStringAD = `${_adDate?.year}-${zeroPad(_adDate?.month, 2)}-${zeroPad(
      _adDate?.day,
      2
    )}`;

    const date = dayjs(dateStringAD).toDate();
    const dateStringBs = `${calendarDate?.year}-${calendarDate?.month}-${calendarDate?.day}`;

    return {
      date,
      en: dateStringAD,
      np: dateStringBs,
    };
  }

  const dateString = `${calendarDate?.year}-${calendarDate?.month}-${calendarDate?.day}`;
  const date = dayjs(dateString).toDate();
  const _adDate = dayjs(date).format('YYYY-MM-DD');
  const _bsDate = ad2bs(calendarDate.year, +calendarDate.month, +calendarDate.day);
  const dateStringBs = `${_bsDate?.year}-${zeroPad(_bsDate?.month, 2)}-${zeroPad(_bsDate?.day, 2)}`;

  return {
    date,
    en: _adDate,
    np: dateStringBs,
  };
};

export const getJSDate = (date: CalendarBuilderDate, calendarType?: 'AD' | 'BS') => {
  if (calendarType === 'BS') {
    const adDate = bs2ad(date.year, +date.month, +date.day);
    return new Date(adDate.year, +adDate.month - 1, +adDate.day);
  }
  return new Date(date.year, +date.month - 1, +date.day);
};

export const getFiscalYears = (date: Date, calendarType: 'AD' | 'BS' = 'AD') => {
  const dateBs = ad2bs(date.getFullYear(), date.getMonth() + 1, date.getDate());

  const todayBs = todayDate.bs;

  const years = Array.from({ length: todayBs.year - dateBs.year + 1 }, (v, k) => k).map(
    (a) => a + dateBs.year
  );

  return years?.map((year) => {
    if (calendarType === 'AD') {
      const fiscalYearStartInAd = bs2ad(year, 4, 1);
      const fiscalYearEndInAd = bs2ad(year + 1, 3, calendarData[(year + 1) as EachBSYear][2]);
      return {
        start: {
          year: fiscalYearStartInAd.year,
          month: zeroPad(fiscalYearStartInAd.month, 2),
          day: zeroPad(fiscalYearStartInAd.day, 2),
          dayOfWeek: fiscalYearStartInAd.dayOfWeek,
        },

        end: {
          year: fiscalYearEndInAd.year,
          month: zeroPad(fiscalYearEndInAd.month, 2),
          day: zeroPad(fiscalYearEndInAd.day, 2),
          dayOfWeek: fiscalYearEndInAd.dayOfWeek,
        },
      };
    }

    return {
      start: {
        year,
        month: '04',
        day: '01',
        // Todo!
        dayOfWeek: 1,
      },
      end: {
        year: year + 1,
        month: '03',
        day: String(calendarData[(year + 1) as EachBSYear][2]),
        dayOfWeek: 1,
      },
    };
  });
};

const adDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
  dayOfWeek: new Date().getDay(),
};

const bsDate = ad2bs(adDate.year, adDate.month, adDate.day);

export const todayDate = {
  current: null,
  today: new Date(),
  ad: adDate,
  bs: bsDate,
};

export const convertTillDate = (date: Date, calendarType: 'AD' | 'BS') => {
  if (calendarType === 'AD') {
    return {
      year: date.getFullYear(),
      month: String(date.getMonth() + 1),
      day: String(date.getDate()),
      dayOfWeek: date.getDay(),
    };
  }
  const tillBsDate = ad2bs(date.getFullYear(), date.getMonth() + 1, date.getDate());

  return {
    year: tillBsDate.year,
    month: String(tillBsDate.month),
    day: String(tillBsDate.day),
    dayOfWeek: tillBsDate.dayOfWeek,
  };
};

// export const convertCalendarDate = (date: CalendarBuilderDate, calendarType: 'AD' | 'BS') => {
//   if (calendarType === 'AD') {
//   }
// };
