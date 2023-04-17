import { useMemo } from 'react';
import { Controller, Path, useFormContext } from 'react-hook-form';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';
import { useRouter } from 'next/router';
import NepaliDate from 'nepali-date-converter';

import { Box, InputProps, Text } from '@myra-ui';
import { DatePicker } from '@myra-ui/date-picker';

import {
  DateType,
  store,
  useAppSelector,
  useGetEndOfDayDateDataQuery,
} from '@coop/cbs/data-access';

interface IFormDatePickerProps<T> extends InputProps {
  name: Path<T> | string;
  label?: string;
  rules?: UseControllerProps['rules'];
  maxDate?: Date;
  minDate?: Date;
  maxToday?: boolean;
  isRequired?: boolean;
  minTransactionDate?: boolean;
}

export const FormDatePicker = <T,>({
  name,
  label,
  maxDate,
  minDate,
  maxToday,
  isRequired,
  minTransactionDate,
  ...rest
}: IFormDatePickerProps<T>) => {
  const router = useRouter();
  const preference = useAppSelector((state) => state?.auth?.preference);

  const dateType = store.getState().auth?.preference?.date || DateType.Ad;

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();

  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const methods = useFormContext();

  const {
    formState: { errors },
    clearErrors,
    control,
  } = methods;

  return (
    <Controller
      name={name}
      rules={rest.rules}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Box display="flex" flexDirection="column" gap="s4">
          <DatePicker
            label={label}
            locale={router.locale as 'en' | 'ne'}
            onChange={(newValue) => {
              if (errors[name]?.type === 'required') {
                clearErrors(name);
              }
              if (preference?.date === 'AD') {
                onChange({ en: newValue.ad, np: newValue.bs, local: '' });
              } else {
                onChange({ np: newValue.bs, en: newValue.ad, local: '' });
              }
            }}
            value={value ? { ad: value.en } : undefined}
            isRequired={isRequired}
            isInvalid={!!errors[name]?.message}
            calendarType={preference?.date || 'AD'}
            // value={value ? (preference?.date === 'AD' ? { ad: value } : { bs: value }) : undefined}
            maxDate={maxToday ? new Date() : maxDate}
            minDate={
              minTransactionDate
                ? closingDate?.local
                  ? dateType === 'BS'
                    ? new NepaliDate(closingDate?.np ?? '').toJsDate()
                    : new Date(closingDate?.en ?? '')
                  : new Date()
                : minDate
            }
          />

          {errors[name] ? (
            <Text variant="formHelper" color="danger.500">
              {errors[name]?.message as string}
            </Text>
          ) : null}
        </Box>
      )}
    />
  );
};

export default FormDatePicker;
