import { Controller, Path, useFormContext } from 'react-hook-form';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';
import { Box, InputProps, TextFields } from '@myra-ui';
import { DatePicker } from '@raralabs/react-patro';
import format from 'date-fns/format';
import NepaliDate from 'nepali-date-converter';

import { DateType, RootState, useAppSelector } from '@coop/cbs/data-access';

interface IFormDatePickerProps<T> extends InputProps {
  name: Path<T> | string;
  label?: string;
  rules?: UseControllerProps['rules'];
  maxToday?: boolean;
  maxDate?: string;
  minDate?: string;
}

export const FormDatePicker = <T,>({
  name,
  label,
  maxToday,
  maxDate,
  minDate,
  ...rest
}: IFormDatePickerProps<T>) => {
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

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
      render={({ field: { onChange, value, ...fieldProps } }) => (
        <Box display="flex" flexDirection="column" gap="s4">
          {label && (
            <TextFields variant="formLabel" color="gray.700">
              {label}
            </TextFields>
          )}

          <DatePicker
            id={name}
            calendarType={preference?.date ?? 'AD'}
            key={`${preference?.date}-${value}`}
            dateFormat="YYYY-MM-DD"
            errorText={errors[name]?.message as string}
            onChange={(...args: (number | Date)[]) => {
              if (args[3]) {
                onChange(args[0]);
              }
              if (errors[name]?.type === 'required') {
                clearErrors(name);
              }
            }}
            value={value ?? ''}
            className="form-datepicker"
            maxDate={
              maxToday
                ? preference?.date === DateType.Bs
                  ? new NepaliDate(new Date()).format('YYYY-MM-DD')
                  : format(new Date(), 'yyyy-MM-dd')
                : maxDate || null
            }
            minDate={minDate ?? null}
            {...rest}
            {...fieldProps}
          />
          {errors[name] ? (
            <TextFields variant="formHelper" color="danger.500">
              {errors[name]?.message as string}
            </TextFields>
          ) : null}
        </Box>
      )}
    />
  );
};

export default FormDatePicker;
