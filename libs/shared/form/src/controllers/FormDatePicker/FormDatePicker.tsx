import { Controller, get, useFormContext } from 'react-hook-form';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';
import { useRouter } from 'next/router';

import { Box, InputProps, Text } from '@myra-ui';
import { DatePicker } from '@myra-ui/date-picker';

import { useAppSelector } from '@coop/cbs/data-access';

export interface IFormDatePickerProps extends InputProps {
  name: string;
  label?: string;
  rules?: UseControllerProps['rules'];
  maxDate?: Date;
  minDate?: Date;
  maxToday?: boolean;
  isRequired?: boolean;
  helperText?: string;
  baseDate?: Date;
  calendarType?: 'AD' | 'BS';
}

export const FormDatePicker = ({
  name,
  label,
  maxDate,
  minDate,
  maxToday,
  isRequired,
  helperText,
  baseDate,
  calendarType,
  // isTransactionBaseDate,
  ...rest
}: IFormDatePickerProps) => {
  const router = useRouter();
  const preference = useAppSelector((state) => state?.auth?.preference);

  const methods = useFormContext();

  const {
    formState: { errors },
    clearErrors,
    control,
  } = methods;

  const errorText = name ? (get(errors, name)?.message as string) : undefined;

  // const { data: endOfDayData } = useGetEndOfDayDateDataQuery();

  // const transactionDate = useMemo(
  //   () => endOfDayData?.transaction?.endOfDayDate?.value,
  //   [endOfDayData]
  // );

  return (
    <Controller
      name={name}
      rules={rest.rules}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Box display="flex" flexDirection="column" gap="s4">
          <DatePicker
            label={label}
            name={name}
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
            calendarType={calendarType || preference?.date || 'AD'}
            // value={value ? (preference?.date === 'AD' ? { ad: value } : { bs: value }) : undefined}
            maxDate={maxToday ? new Date() : maxDate}
            minDate={minDate}
            baseDate={baseDate}
            // baseDate={
            //   isTransactionBaseDate && transactionDate?.en
            //     ? new Date(transactionDate.en)
            //     : new Date()
            // }
          />

          {
            /* eslint-disable no-nested-ternary */
            errorText ? (
              <Text variant="formHelper" color="danger.500">
                {errorText}
              </Text>
            ) : helperText ? (
              <Text variant="formHelper" color="gray.700">
                {helperText}
              </Text>
            ) : null
          }
        </Box>
      )}
    />
  );
};

export default FormDatePicker;
