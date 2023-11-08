import { Controller, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { RangedDatePicker } from '@myra-ui/date-picker';

import { useAppSelector, useGetEndOfDayDateDataQuery } from '@coop/cbs/data-access';

interface IReportDateRange {
  label?: string;
  name?: string;
}

export const ReportCustomDateRange = ({ label = 'Select Period', name }: IReportDateRange) => {
  const { control } = useFormContext();
  const { locale } = useRouter();
  const { data } = useGetEndOfDayDateDataQuery();

  const calendarType = useAppSelector((state) => state?.auth?.preference?.date);
  const transactionDate = data?.transaction?.endOfDayDate?.value?.en;

  const user = useAppSelector((state) => state?.auth?.user);

  const organizationStartDate = user?.organization?.basicDetails?.organizationStartDate;

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <RangedDatePicker
          label={label}
          locale={locale === 'ne' ? 'ne' : 'en'}
          calendarType={calendarType || 'BS'}
          value={value}
          baseDate={new Date(transactionDate || '')}
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
          // showFiscalPeriod={fa}
          showFiscalYearOnly
          showPeriods={false}
          showCustomPeriod={false}
          showTillDatePeriod={false}
        />
      )}
      control={control}
      name={name ?? 'period'}
    />
  );
};
