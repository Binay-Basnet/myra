import { Controller, Path, useFormContext } from 'react-hook-form';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';
import { DatePicker } from '@raralabs/react-patro';

import { RootState, useAppSelector } from '@coop/cbs/data-access';
import { Box, InputProps, TextFields } from '@coop/shared/ui';

// import './FormDatePicker.css';

interface IFormDatePickerProps<T> extends InputProps {
  name: Path<T> | string;
  label?: string;
  rules?: UseControllerProps['rules'];
}

export const FormLocalDatePicker = <T,>({ name, label, ...rest }: IFormDatePickerProps<T>) => {
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
