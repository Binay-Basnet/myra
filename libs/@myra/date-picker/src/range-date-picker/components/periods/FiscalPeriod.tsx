import { Box } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { PeriodWrapper } from './PeriodWrapper';
import { DateRange } from '../../../types/date';
import { bs2ad } from '../../../utils/ad-bs-converter';
import { ordinal } from '../../../utils/constants';
import { convertDate, getFiscalYears } from '../../../utils/functions';

interface IFiscalPeriodProps {
  tillDateStart: Date;
  calendarType: 'AD' | 'BS';
  locale: 'en' | 'ne';
  value: DateRange | undefined;

  onChange: (newDate: DateRange | undefined) => void;
  onToggle: () => void;
}

export const FiscalPeriod = ({
  value,
  tillDateStart,
  calendarType,
  locale,
  onChange,
  onToggle,
}: IFiscalPeriodProps) => {
  const fiscalYears = getFiscalYears(tillDateStart, calendarType);

  return (
    <Box p="s8">
      {fiscalYears?.map((fiscalYear) => {
        const adStartFiscalYear =
          calendarType === 'BS'
            ? bs2ad(fiscalYear.start.year, +fiscalYear.start.month, +fiscalYear.start.day)
            : fiscalYear.start;

        return (
          <PeriodWrapper
            isSelected={dayjs(
              `${adStartFiscalYear.year}-${adStartFiscalYear.month}-${adStartFiscalYear.day}`
            ).isSame(dayjs(value?.from?.en || 10), 'day')}
            onClick={() => {
              onChange({
                from: convertDate(fiscalYear.start, calendarType),
                to: convertDate(fiscalYear.end, calendarType),
              });
              onToggle();
            }}
            title={
              locale === 'ne'
                ? ordinal(
                    `${fiscalYear.start.year} / ${fiscalYear.end.year} (${fiscalYear.start.year}-${fiscalYear.start.month}-${fiscalYear.start.day} - ${fiscalYear.end.year}-${fiscalYear.end.month}-${fiscalYear.end.day})`
                  )
                : `${fiscalYear.start.year} / ${fiscalYear.end.year} (${fiscalYear.start.year}-${fiscalYear.start.month}-${fiscalYear.start.day} - ${fiscalYear.end.year}-${fiscalYear.end.month}-${fiscalYear.end.day})`
            }
          />
        );
      })}
    </Box>
  );
};
