import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { RangedDatePicker } from '@myra-ui/date-picker';

import { useAppSelector, useGetEndOfDayDateDataQuery } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

interface IReportDateRange {
  label?: string;
  name?: string;
  setInitialDate?: boolean;
  baseDate?: Date;
}

export const ReportDateRange = ({
  label = 'reportsSelectPeriod',
  name = 'period',
  setInitialDate = true,
  baseDate,
}: IReportDateRange) => {
  const { t } = useTranslation();

  const { control, setValue, watch } = useFormContext();
  const { locale } = useRouter();
  const { data } = useGetEndOfDayDateDataQuery();

  const calendarType = useAppSelector((state) => state?.auth?.preference?.date);
  const transactionDate = data?.transaction?.endOfDayDate?.value;

  const user = useAppSelector((state) => state?.auth?.user);

  const organizationStartDate = user?.organization?.basicDetails?.organizationStartDate;

  const dateField = watch(name ?? 'period');

  useEffect(() => {
    if (setInitialDate && !dateField?.from && !dateField?.to) {
      setValue(name, { from: transactionDate, to: transactionDate });
    }
  }, [name, setValue, transactionDate, dateField]);

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <RangedDatePicker
          label={t[label] || label}
          locale={locale === 'ne' ? 'ne' : 'en'}
          calendarType={calendarType || 'BS'}
          value={value}
          baseDate={baseDate || new Date(transactionDate?.en || '')}
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
          tillDateStart={
            organizationStartDate?.en ? new Date(organizationStartDate?.en) : new Date('2014-07-14')
          }
        />
      )}
      control={control}
      name={name ?? 'period'}
    />
  );
};
