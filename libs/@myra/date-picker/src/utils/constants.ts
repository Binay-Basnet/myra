// np= nepali, rm="roman" , en="english"
import dayjs from 'dayjs';

export const lang = ['np', 'rm', 'en'];
export const variant = ['long', 'short', 'min'];
export const calendar = ['AD', 'BS'];
export const np = {
  dayName: {
    full: ['आइतवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'बिहिवार', 'शुक्रवार', 'शनिवार'],
    short: ['आइ', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'],
    min: ['आ', 'सो', 'मं', 'बु', 'बि', 'शु', 'श'],
  },
  monthName: {
    full: [
      'बैशाख',
      'जेष्ठ',
      'आषाढ',
      'श्रावण',
      'भाद्र',
      'आश्विन',
      'कार्तिक',
      'मंसिर',
      'पौष',
      'माघ',
      'फाल्गुन',
      'चैत्र',
    ],
    short: ['बै', 'जे', 'आषा', 'श्रा', 'भा', 'आश', 'का', 'मं', 'पौ', 'मा', 'फा', 'चै'],
    min: ['बै', 'जे', 'आषा', 'श्रा', 'भा', 'आश', 'का', 'मं', 'पौ', 'मा', 'फा', 'चै'],
  },
};
export const rm = {
  dayName: {
    full: [
      'Aaitabaar',
      'Sombaar',
      'Mangalbaar',
      'Budhabaar',
      'Bihibaar',
      'Shukrabaar',
      'Shanibaar',
    ],
    short: ['Aaita', 'Som', 'Mangal', 'Budha', 'Bihi', 'Shukra', 'Shani'],
    min: ['Aai', 'So', 'Man', 'Bu', 'Bi', 'Shu', 'Sha'], // TODO check
  },
  monthName: {
    full: [
      'Baisakh',
      'Jestha',
      'Ashadh',
      'Shrawan',
      'Bhadra',
      'Ashwin',
      'Kartik',
      'Mangsir',
      'Paush',
      'Mangh',
      'Falgun',
      'Chaitra',
    ],
    short: ['Bai', 'Je', 'As', 'Shra', 'Bha', 'Ash', 'Kar', 'Mang', 'Pau', 'Ma', 'Fal', 'Chai'],
    min: ['Bai', 'Je', 'As', 'Shra', 'Bha', 'Ash', 'Kar', 'Mang', 'Pau', 'Ma', 'Fal', 'Chai'],
  },
};
export const en = {
  dayName: {
    full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    min: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  },
  monthName: {
    full: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    min: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
};
export const npNumsArray = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
export const nums = {
  0: '०',
  1: '१',
  2: '२',
  3: '३',
  4: '४',
  5: '५',
  6: '६',
  7: '७',
  8: '८',
  9: '९',
};
export const ordinal = (n: number | string) =>
  `${n}`.replace(/\d/g, (i) => '०१२३४५६७८९'[i as unknown as number]);

export const minBsYear = 1978;
export const maxBsYear = 2100; // TODO
export const minAdYear = 1921;
export const minAdMonth = 3;
export const minAdDate = 13;
export const maxAdYear = 2043; // TODo
export const daysInYear = 365;
export const minMonth = 1;
export const minDays = 1;
export const maxMonth = 12;
export const maxDays = 32;
export const baseAd = { year: 1921, month: 3, day: 13, dayOfWeek: 3 }; // dayOfWeek: 0 for sunday, 1 for monday and so on
export const baseBs = { year: 1978, month: 0, day: 1, dayOfWeek: 3 };
export const calendarData = {
  1978: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  1979: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
  1980: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  1981: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
  1982: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  1983: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
  1984: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  1985: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
  1986: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  1987: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
  1988: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  1989: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  1990: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  1991: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
  1992: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
  1993: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  1994: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  1995: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
  1996: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
  1997: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  1998: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  1999: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
  2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
  2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  2004: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
  2005: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2006: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
  2007: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  2008: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
  2009: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2010: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
  2011: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  2012: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
  2013: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2014: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
  2015: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  2016: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
  2017: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2018: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
  2019: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
  2020: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2021: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2022: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
  2023: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
  2024: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2025: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2026: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  2027: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
  2028: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2029: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365],
  2030: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  2031: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
  2032: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2033: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
  2034: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  2035: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
  2036: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2037: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
  2038: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  2039: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
  2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2041: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
  2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  2043: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
  2044: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2045: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
  2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  2047: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2048: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2049: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
  2050: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
  2051: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2052: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2053: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
  2054: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
  2055: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2056: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365],
  2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  2058: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
  2059: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2060: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
  2061: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  2062: [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31, 365],
  2063: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2064: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
  2065: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  2066: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
  2067: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2068: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
  2069: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  2070: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
  2071: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2072: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
  2073: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
  2074: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2075: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
  2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
  2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
  2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
  2081: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366],
  2082: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
  2083: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365],
  2084: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365],
  2085: [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30, 366],
  2086: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
  2087: [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30, 366],
  2088: [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30, 365],
  2089: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
  2090: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
  2091: [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30, 366],
  2092: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366],
};

/*
 * gathered data below; if anybody can validate below, thanks!
 * A hacky way is to iterate for the unknown dates is to use daysPerYear and loop through
 *
 '2093': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366 ],
 '2094': [ 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
 '2095': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30, 366 ],
 '2096': [ 30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 364 ],
 '2097': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366 ],
 '2098': [ 31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 30, 31, 366 ],
 '2099': [ 31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30, 365 ],
 '2100': [ 31, 32, 31, 32, 30, 31, 30, 29, 30, 29, 30, 30, 365 ]
 */

const convertDate = (date: Date) => {
  const _date = dayjs(date);

  return {
    year: _date?.get('year'),
    month: String(Number(_date?.get('month')) + 1),
    day: String(_date?.get('date')),
    dayOfWeek: _date.get('day'),
  };
};

export const today = convertDate(dayjs(new Date()).toDate());
export const yesterday = convertDate(dayjs(new Date()).subtract(1, 'day')?.toDate());
export const last7Days = convertDate(dayjs(new Date()).subtract(7, 'day')?.toDate());
export const last30Days = convertDate(dayjs(new Date()).subtract(30, 'day')?.toDate());
