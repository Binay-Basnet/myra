import { Controller, Path, useFormContext } from 'react-hook-form';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';

import { Box, InputProps, Text } from '@myra-ui';
import { DatePicker } from '@myra-ui/date-picker';

import { useAppSelector } from '@coop/cbs/data-access';

interface IFormDatePickerProps<T> extends InputProps {
  name: Path<T> | string;
  label?: string;
  rules?: UseControllerProps['rules'];
  maxDate?: Date;
  minDate?: Date;
  maxToday?: boolean;
}

export const FormDatePicker = <T,>({
  name,
  label,
  maxDate,
  minDate,
  maxToday,
  ...rest
}: IFormDatePickerProps<T>) => {
  const preference = useAppSelector((state) => state?.auth?.preference);

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
            locale={preference?.languageCode as 'en' | 'ne'}
            onChange={(newValue) => {
              if (errors[name]?.type === 'required') {
                clearErrors(name);
              }
              onChange(newValue.ad);
            }}
            isInvalid={!!errors[name]?.message}
            calendarType={preference?.date || 'AD'}
            value={value ? (preference?.date === 'AD' ? { ad: value } : { bs: value }) : undefined}
            maxDate={maxToday ? new Date() : maxDate}
            minDate={minDate}
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
