// eslint-disable-next-line import/no-cycle
import { baseAd, baseBs, BS_YEAR_MONTH_DAYS } from './constants';

export type EachBSYear = keyof typeof BS_YEAR_MONTH_DAYS;

/**
 * Stores how many days has passed from the beginning in each year object
 */
export const cache = {
  getCumulativeTotal: (() => {
    const memo: { result?: Record<number, number> } = {};

    return () => {
      if (Object.prototype.hasOwnProperty.call(memo, 'result')) {
        return memo.result;
      }

      const years = Object.keys(BS_YEAR_MONTH_DAYS);
      const startingYear = +years[0];
      const totalYears = years.length;
      const obj: Record<number, number> = {};

      for (let i = 0; i < totalYears; i += 1) {
        const yearIndex = startingYear + i;

        obj[yearIndex] =
          (i === 0 ? 0 : obj[yearIndex - 1]) +
          BS_YEAR_MONTH_DAYS[yearIndex as EachBSYear].slice(-1)[0];
      }

      memo.result = obj;
      return obj;
    };
  })(),
};

/**
 * Returns the Index of week  0 for sunday and so on..
 * @param {number} daysCount - No. of days from the base bs
 */
const getDayIndex = (daysCount: number) => ((daysCount % 7) + baseBs.dayOfWeek) % 7;

/**
 * Returns the number of days from the base_bs day
 * @param {Date} date - AD date in the format
 */
const countBSDaysFromBaseDateUsingAdDate = (year: number, month: number, day: number) => {
  const dateObj = { year, month: month - 1, day };

  const date1 = new Date(baseAd.year, baseAd.month, baseAd.day);
  const date2 = new Date(dateObj.year, dateObj.month, dateObj.day);

  const timeDiff = date2.getTime() - date1.getTime();

  const dayCount = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return dayCount;
};

/**
 * Convert AD To BS date
 */
export const ad2bs = (years: number, months: number, date: number) => {
  const dayCount = countBSDaysFromBaseDateUsingAdDate(years, months, date);

  const cumulativeData = cache.getCumulativeTotal();

  if (!cumulativeData) {
    throw new Error("The date doesn't fall within 1975/01/01 - 2092/12/30");
  }

  const values = Object.values(cumulativeData);
  const yearIndex = values.findIndex((value) => (value as number) >= dayCount);

  let year = +baseBs.year + yearIndex;
  let offsetDays = yearIndex === 0 ? dayCount : dayCount - cumulativeData[year - 1];

  let month = 0;

  while (BS_YEAR_MONTH_DAYS[year as EachBSYear]?.[month] <= offsetDays) {
    // check
    offsetDays -= BS_YEAR_MONTH_DAYS[year as EachBSYear][month];
    month += 1;
  }
  if (+month === 12) {
    month = 0;
    year += 1;
  }

  return {
    year,
    month: month + 1, // 1 for Baisakh
    day: offsetDays + 1,
    dayOfWeek: getDayIndex(dayCount),
  };
};

/**
 * Convert BS To AD date
 */
export const bs2ad = (year: number, month: number, day: number) => {
  const cumulativeData = cache.getCumulativeTotal();

  if (!cumulativeData) {
    throw new Error("The date doesn't fall within 1975/01/01 - 2092/12/30");
  }

  let prevMonthCumulativeTotal = 0;
  const prevYearCumulativeTotal = cumulativeData[+year - 1];
  for (let i = 0; i < +month - 1; i += 1) {
    prevMonthCumulativeTotal += BS_YEAR_MONTH_DAYS[+year as EachBSYear][i];
  }

  const countDays = prevYearCumulativeTotal + prevMonthCumulativeTotal + +day - 1;

  const date1 = new Date(baseAd.year, baseAd.month, baseAd.day);
  date1.setDate(date1.getDate() + countDays);

  return {
    year: date1.getFullYear(),
    month: date1.getMonth() + 1,
    day: date1.getDate(),
    dayOfWeek: date1.getDay(),
  };
};

/**
 * Get Days is the given month and year
 */
export const getBSMonthDays = (month: number, year: number) =>
  BS_YEAR_MONTH_DAYS[year as EachBSYear][month - 1];

/**
 * Get Days is the given month and year
 */
export const getStartingDayOfBsMonth = (year: number, month: number) => {
  const monthIndex = month - 1;
  const cumulativeData = cache.getCumulativeTotal();

  if (!cumulativeData) {
    throw new Error("The date doesn't fall within 1975/01/01 - 2092/12/30");
  }

  const prevYearTotal = cumulativeData[year - 1] || 0;
  let days = 0;
  for (let i = 0; i < monthIndex; i += 1) {
    days += BS_YEAR_MONTH_DAYS[year as EachBSYear][i];
  }
  const daysCount = prevYearTotal + days;
  return getDayIndex(daysCount);
};
