import { ad2bs, bs2ad, getBSMonthDays, getStartingDayOfBsMonth } from './ad-bs-converter';
import { CALENDAR_WEEKS, getNextMonth, getPreviousMonth, zeroPad } from './calendar-builder';
import { CalendarBuilderDate } from '../types/date';

export default (month = 8, year = 2079): CalendarBuilderDate[] => {
  // Get number of days in the month and the month's first day

  const monthDays = getBSMonthDays(month, year);
  const monthFirstDay = getStartingDayOfBsMonth(year, month);

  // Get number of days to be displayed from previous and next months
  // These ensure a total of 42 days (6 weeks) displayed on the calendar

  const daysFromPrevMonth = monthFirstDay;
  const daysFromNextMonth = CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);
  // Get the previous and next months and years

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year);
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);
  // Get number of days in previous month
  const prevMonthDays = getBSMonthDays(prevMonth, prevMonthYear);
  // Builds dates to be displayed from previous month

  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index): CalendarBuilderDate => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);

    const adDate = bs2ad(prevMonthYear, prevMonth, day);
    const bsDate = ad2bs(adDate.year, adDate.month, adDate.day);

    return {
      year: prevMonthYear,
      month: zeroPad(prevMonth, 2),
      day: zeroPad(day, 2),
      dayOfWeek: bsDate.dayOfWeek,
    };
  });
  // Builds dates to be displayed from current month

  const thisMonthDates = [...new Array(monthDays)].map((n, index): CalendarBuilderDate => {
    const day = index + 1;
    const adDate = bs2ad(year, month, day);
    const bsDate = ad2bs(adDate.year, adDate.month, adDate.day);
    return {
      year,
      month: zeroPad(month, 2),
      day: zeroPad(day, 2),
      dayOfWeek: bsDate.dayOfWeek,
    };
  });

  // Builds dates to be displayed from next month
  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index): CalendarBuilderDate => {
    const day = index + 1;
    const adDate = bs2ad(nextMonthYear, nextMonth, day);
    const bsDate = ad2bs(adDate.year, adDate.month, adDate.day);

    return {
      year: nextMonthYear,
      month: zeroPad(nextMonth, 2),
      day: zeroPad(day, 2),
      dayOfWeek: bsDate.dayOfWeek,
    };
  });

  // Combines all dates from previous, current and next months
  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};
