// (int) The current year
import { CalendarBuilderDate } from '../types/date';

export const THIS_YEAR = +new Date().getFullYear();

// (int) The current month starting from 1 - 12
// 1 => January, 12 => December
export const THIS_MONTH = +new Date().getMonth() + 1;

// Week days names and shortnames
export const WEEK_DAYS = {
  Sunday: 'Sun',
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
};

// Calendar months names and short names
export const CALENDAR_MONTHS = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sep',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec',
};

// Weeks displayed on calendar
export const CALENDAR_WEEKS = 6;

// Pads a string value with leading zeroes(0) until length is reached
// For example: zeroPad(5, 2) => "05"
export const zeroPad = (value: number, length: number) => `${value}`.padStart(length, '0');

// (int) Number days in a month for a given year from 28 to 31
export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
  const months30 = [4, 6, 9, 11];
  const leapYear = year % 4 === 0;
  return month === 2 ? (leapYear ? 29 : 28) : months30.includes(month) ? 30 : 31;
};
// (int) First day of the month for a given year from 1 to 7
// 1 => Sunday, 7 => Saturday
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) =>
  +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 1;

// (bool) Checks if a value is a date - this is just a simple check
export const isDate = (date: Date | null | undefined) => {
  const isJSDate = Object.prototype.toString.call(date) === '[object Date]';
  const isValidDate = date && !Number.isNaN(date.valueOf());

  return isJSDate && isValidDate;
};

// (bool) Checks if two date values are of the same month and year
export const isSameMonth = (date: Date, baseDate = new Date()) => {
  if (!(isDate(date) && isDate(baseDate))) return false;
  const baseDateMonth = +baseDate.getMonth() + 1;
  const baseDateYear = baseDate.getFullYear();
  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();
  return +baseDateMonth === +dateMonth && +baseDateYear === +dateYear;
};

// (bool) Checks if two date values are the same day
export const isSameDay = (date: Date, baseDate = new Date()) => {
  if (!(isDate(date) && isDate(baseDate))) return false;
  const baseDateDate = baseDate.getDate();
  const baseDateMonth = +baseDate.getMonth() + 1;
  const baseDateYear = baseDate.getFullYear();
  const dateDate = date.getDate();
  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();
  return (
    +baseDateDate === +dateDate && +baseDateMonth === +dateMonth && +baseDateYear === +dateYear
  );
};

// (string) Formats the given date as YYYY-MM-DD
// Months and Days are zero padded
export const getDateISO = (date = new Date()) => {
  if (!isDate(date)) return null;
  return [date.getFullYear(), zeroPad(+date.getMonth() + 1, 2), zeroPad(+date.getDate(), 2)].join(
    '-'
  );
};

// ({month, year}) Gets the month and year before the given month and year
// For example: getPreviousMonth(1, 2000) => {month: 12, year: 1999}
// while: getPreviousMonth(12, 2000) => {month: 11, year: 2000}
export const getPreviousMonth = (month: number, year: number) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;
  return { month: prevMonth, year: prevMonthYear };
};

// ({month, year}) Gets the month and year after the given month and year
// For example: getNextMonth(1, 2000) => {month: 2, year: 2000}
// while: getNextMonth(12, 2000) => {month: 1, year: 2001}
export const getNextMonth = (month: number, year: number) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;
  return { month: nextMonth, year: nextMonthYear };
};

// Calendar builder for a month in the specified year
// Returns an array of the calendar dates.
// Each calendar date is represented as an array => [YYYY, MM, DD]
export default (month = THIS_MONTH, year = THIS_YEAR): CalendarBuilderDate[] => {
  // Get number of days in the month and the month's first day

  const monthDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);
  // Get number of days to be displayed from previous and next months
  // These ensure a total of 42 days (6 weeks) displayed on the calendar

  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth = CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);
  // Get the previous and next months and years

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year);
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);
  // Get number of days in previous month
  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);
  // Builds dates to be displayed from previous month

  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index): CalendarBuilderDate => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);

    const date = new Date(prevMonthYear, prevMonth, day);

    return {
      year: prevMonthYear,
      month: zeroPad(prevMonth, 2),
      day: zeroPad(day, 2),
      dayOfWeek: date.getDay(),
    };
  });
  // Builds dates to be displayed from current month

  const thisMonthDates = [...new Array(monthDays)].map((n, index): CalendarBuilderDate => {
    const day = index + 1;

    const date = new Date(year, month, day);

    return {
      year,
      month: zeroPad(month, 2),
      day: zeroPad(day, 2),
      dayOfWeek: date.getDay(),
    };
  });

  // Builds dates to be displayed from next month
  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index): CalendarBuilderDate => {
    const day = index + 1;

    const date = new Date(nextMonthYear, nextMonth, day);

    return {
      year: nextMonthYear,
      month: zeroPad(nextMonth, 2),
      day: zeroPad(day, 2),
      dayOfWeek: date.getDay(),
    };
  });

  // Combines all dates from previous, current and next months
  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};
