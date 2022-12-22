import React, { Fragment } from 'react';
import { Box } from '@chakra-ui/react';

import { PeriodWrapper } from './PeriodWrapper';
import { en } from '../../../locale/en';
import { useLocale } from '../../../locale/useLocale';
import { CalendarBuilderDate, DateRange, Period, TDateState } from '../../../types/date';
import { bsToday, getPeriodDate, today } from '../../../utils/constants';
import { convertDate, todayDate } from '../../../utils/functions';

interface IPeriodsProps {
  periods: Period[];
  locale: 'en' | 'ne';
  calendarType: 'AD' | 'BS';

  onToggle: () => void;

  setRangeStartDate: React.Dispatch<React.SetStateAction<CalendarBuilderDate | null>>;
  setRangeEndDate: React.Dispatch<React.SetStateAction<CalendarBuilderDate | null>>;
  setHoveredDate: React.Dispatch<React.SetStateAction<CalendarBuilderDate | null>>;

  selectedPeriod: string | null;
  setSelectedPeriod: React.Dispatch<React.SetStateAction<string | null>>;

  showFiscalPeriod: boolean;
  showCustomPeriod: boolean;
  showTillDatePeriod: boolean;

  tillDate: { year: number; month: string; day: string; dayOfWeek: number };

  onChange: (newDate: DateRange | undefined) => void;
  setState: React.Dispatch<React.SetStateAction<TDateState>>;
}

export const Periods = ({
  periods,
  locale,
  onToggle,
  calendarType,
  setRangeStartDate,
  setRangeEndDate,
  setHoveredDate,
  selectedPeriod,
  setSelectedPeriod,
  showFiscalPeriod,
  showCustomPeriod,
  showTillDatePeriod,
  tillDate,
  onChange,
  setState,
}: IPeriodsProps) => {
  const { t } = useLocale(locale);

  return (
    <Box flexShrink={0} w="240px" borderRight="1px" borderColor="border.layout" p="s8">
      {periods.map((defaultPeriod) => (
        <Fragment key={defaultPeriod.key}>
          <PeriodWrapper
            title={t[defaultPeriod.title as keyof typeof en] || defaultPeriod.title}
            isSelected={selectedPeriod === defaultPeriod.key}
            onClick={() => {
              if (defaultPeriod.closePopover) {
                onChange({
                  from: convertDate(
                    getPeriodDate(defaultPeriod.lastDays, calendarType),
                    calendarType
                  ),
                  to: convertDate(
                    getPeriodDate(defaultPeriod.lastDays, calendarType),
                    calendarType
                  ),
                });
                onToggle();
              } else {
                setRangeStartDate(getPeriodDate(defaultPeriod.lastDays, calendarType));
                setRangeEndDate(getPeriodDate(0, calendarType));
                setHoveredDate(getPeriodDate(0, calendarType));
              }

              setSelectedPeriod(defaultPeriod.key);
              setState(todayDate);
            }}
          />
        </Fragment>
      ))}

      {showFiscalPeriod && (
        <PeriodWrapper
          title={t.fiscalYear}
          isSelected={selectedPeriod === 'FISCAL_YEAR'}
          onClick={() => {
            setSelectedPeriod('FISCAL_YEAR');
            setRangeStartDate(null);
            setRangeEndDate(null);
          }}
        />
      )}

      {showCustomPeriod && (
        <PeriodWrapper
          title={t.customPeriod}
          isSelected={selectedPeriod === 'CUSTOM_PERIOD'}
          onClick={() => {
            setSelectedPeriod('CUSTOM_PERIOD');
            setRangeStartDate(null);
            setRangeEndDate(null);
          }}
        />
      )}

      {showTillDatePeriod && (
        <PeriodWrapper
          title={t.tillDate}
          isSelected={selectedPeriod === 'TILL_DATE'}
          onClick={() => {
            if (calendarType === 'AD') {
              setRangeStartDate(tillDate);
              setRangeEndDate(today);
            } else {
              setRangeStartDate(tillDate);
              setRangeEndDate(bsToday);
              setState(todayDate);
            }

            setSelectedPeriod('TILL_DATE');
          }}
        />
      )}
    </Box>
  );
};
