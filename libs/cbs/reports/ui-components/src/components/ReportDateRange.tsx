import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { RangedDatePicker } from '@myra-ui/date-picker';

import { useAppSelector, useGetEndOfDayDateDataQuery } from '@coop/cbs/data-access';

interface IReportDateRange {
  label?: string;
  name?: string;
}

export const ReportDateRange = ({ label = 'Select Period', name = 'period' }: IReportDateRange) => {
  const { control, setValue } = useFormContext();
  const { locale } = useRouter();
  const { data } = useGetEndOfDayDateDataQuery();

  const calendarType = useAppSelector((state) => state?.auth?.preference?.date);
  const transactionDate = data?.transaction?.endOfDayDate?.value;

  useEffect(() => {
    setValue(name, { from: transactionDate, to: transactionDate });
  }, [name, setValue, transactionDate]);

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <RangedDatePicker
          label={label}
          locale={locale === 'ne' ? 'ne' : 'en'}
          calendarType={calendarType || 'BS'}
          value={value}
          baseDate={new Date(transactionDate?.en || '')}
          onChange={(newDate) =>
            onChange({
              from: {
                en: newDate?.from?.en,
                np: newDate?.from?.np,
              },
              to: {
                en: newDate?.to?.en,
                np: newDate?.to?.np,
              },
            })
          }
          tillDateStart={new Date('2014-07-14')}
        />
      )}
      control={control}
      name={name ?? 'period'}
    />
  );
};
