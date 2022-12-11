import { Controller, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { RangedDatePicker } from '@myra-ui/date-picker';

import { ReportPeriodType, useAppSelector } from '@coop/cbs/data-access';

interface IReportDateRange {
  label?: string;
}

export const ReportDateRange = ({ label = 'Select Period' }: IReportDateRange) => {
  const { control } = useFormContext();
  const { locale } = useRouter();
  const calendarType = useAppSelector((state) => state?.auth?.preference?.date);

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <RangedDatePicker
          label={label}
          locale={locale === 'ne' ? 'ne' : 'en'}
          calendarType={calendarType || 'AD'}
          value={value?.customPeriod}
          onChange={(newDate) =>
            onChange({
              periodType: ReportPeriodType.CustomPeriod,
              customPeriod: {
                from: {
                  en: newDate?.from?.en,
                  ne: newDate?.from?.ne,
                },
                to: {
                  en: newDate?.to?.en,
                  ne: newDate?.to?.ne,
                },
              },
            })
          }
          tillDateStart={new Date('2019-12-10')}
        />
      )}
      control={control}
      name="period"
    />
  );
};
