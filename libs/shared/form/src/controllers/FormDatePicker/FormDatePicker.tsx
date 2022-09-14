import { Control, Controller, Path, useFormContext } from 'react-hook-form';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';
import { DatePicker } from 'react-patro';
import format from 'date-fns/format';

import { Box, InputProps, TextFields } from '@coop/shared/ui';

// import './FormDatePicker.css';

interface IFormDatePickerProps<T> extends InputProps {
  name: Path<T> | string;
  label?: string;
  control?: Control<T>;
  rules?: UseControllerProps['rules'];
}

export const FormDatePicker = <T,>({ name, label, ...rest }: IFormDatePickerProps<T>) => {
  // const user = useAppSelector((state: RootState) => state?.auth?.user);

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
            calendarType="AD"
            key={value}
            dateFormat="yyyy-mm-dd"
            errorText={errors[name]?.message as string}
            onChange={(...args: (number | Date)[]) => {
              if (args[3]) {
                onChange(format(args[3], 'yyyy-MM-dd'));
              }
              if (errors[name]?.type === 'required') {
                clearErrors(name);
              }
            }}
            value={value ?? ''}
            className="form-datepicker"
            {...rest}
            {...fieldProps}
          />
        </Box>
      )}
    />
  );
};

export default FormDatePicker;
