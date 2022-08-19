import date from 'dayjs';

import { ReportPeriodType } from '@coop/cbs/data-access';

type Period = ReportPeriodType;

interface GetPeriodDateProps {
  period: Period;
}

export const getPeriodDate = ({ period }: GetPeriodDateProps) => {
  switch (period) {
    case ReportPeriodType.Today:
      return {
        from: date().format('YYYY-MM-DD'),
        to: date().format('YYYY-MM-DD'),
      };

    case ReportPeriodType.Yesterday:
      return {
        from: date().subtract(1, 'day').format('YYYY-MM-DD'),
        to: date().subtract(1, 'day').format('YYYY-MM-DD'),
      };

    case ReportPeriodType.Last_7Days:
      return {
        from: date().subtract(7, 'day').format('YYYY-MM-DD'),
        to: date().format('YYYY-MM-DD'),
      };

    case ReportPeriodType.Last_14Days:
      return {
        from: date().subtract(14, 'day').format('YYYY-MM-DD'),
        to: date().format('YYYY-MM-DD'),
      };

    case ReportPeriodType.Last_30Days:
      return {
        from: date().subtract(30, 'day').format('YYYY-MM-DD'),
        to: date().format('YYYY-MM-DD'),
      };

    case ReportPeriodType.ThisFiscalYearToDate:
      return {
        from: date().subtract(12, 'month').format('YYYY-MM-DD'),
        to: date().format('YYYY-MM-DD'),
      };

    case ReportPeriodType.CustomPeriod:
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
