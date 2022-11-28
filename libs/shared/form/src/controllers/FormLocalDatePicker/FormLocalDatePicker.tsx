import { Controller, Path, useFormContext } from 'react-hook-form';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';
import { DatePicker } from '@raralabs/react-patro';
import format from 'date-fns/format';
import NepaliDate from 'nepali-date-converter';

import { DateType, RootState, useAppSelector } from '@coop/cbs/data-access';
import { Box, InputProps, TextFields } from '@myra-ui';

// import './FormDatePicker.css';

interface IFormDatePickerProps<T> extends InputProps {
  name: Path<T> | string;
  label?: string;
  rules?: UseControllerProps['rules'];
  maxToday?: boolean;
}

export const FormLocalDatePicker = <T,>({
  name,
  label,
  maxToday,
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
            dateFormat="yyyy-mm-dd"
            errorText={errors[name]?.message as string}
            onChange={(...args: (number | Date)[]) => {
              if (args[3]) {
                if (preference?.date === 'AD') {
                  onChange({ en: args[0], np: '', local: '' });
                } else {
                  onChange({ np: args[0], en: '', local: '' });
                }
              }
              if (errors[name]?.type === 'required') {
                clearErrors(name);
              }
            }}
            value={preference?.date === 'AD' ? value?.en : value?.np}
            className="form-datepicker"
            maxDate={
              maxToday
                ? preference?.date === DateType.Bs
                  ? new NepaliDate(new Date()).format('YYYY-MM-DD')
                  : format(new Date(), 'yyyy-MM-dd')
                : null
            }
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

export default FormLocalDatePicker;
