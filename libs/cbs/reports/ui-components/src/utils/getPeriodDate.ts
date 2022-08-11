import date from 'dayjs';

type Period =
  | 'today'
  | 'yesterday'
  | 'week'
  | 'last-7'
  | 'last-14'
  | 'last-30'
  | 'last-year'
  | 'custom-period'
  | 'everything';

interface GetPeriodDateProps {
  period: Period;
}

export const getPeriodDate = ({ period }: GetPeriodDateProps) => {
  switch (period) {
    case 'today':
      return {
        from: date().format('YYYY-MM-DD'),
        to: date().format('YYYY-MM-DD'),
      };

    case 'yesterday':
      return {
        from: date().subtract(1, 'day').format('YYYY-MM-DD'),
        to: date().subtract(1, 'day').format('YYYY-MM-DD'),
      };

    case 'week':
      return {
        from: date().subtract(date().get('day'), 'day').format('YYYY-MM-DD'),
        to: date().format('YYYY-MM-DD'),
      };

    case 'last-7':
      return {
        from: date().subtract(7, 'day').format('YYYY-MM-DD'),
        to: date().format('YYYY-MM-DD'),
      };

    case 'last-14':
      return {
        from: date().subtract(14, 'day').format('YYYY-MM-DD'),
        to: date().format('YYYY-MM-DD'),
      };

    case 'last-30':
      return {
        from: date().subtract(30, 'day').format('YYYY-MM-DD'),
        to: date().format('YYYY-MM-DD'),
      };

    case 'last-year':
      return {
        from: date().subtract(12, 'month').format('YYYY-MM-DD'),
        to: date().format('YYYY-MM-DD'),
      };

    case 'everything':
      return {
        from: date().subtract(1000, 'year').format('YYYY-MM-DD'),
        to: date().format('YYYY-MM-DD'),
      };

    default:
      return {
        from: date().format('YYYY-MM-DD'),
        to: date().format('YYYY-MM-DD'),
      };
  }
};
