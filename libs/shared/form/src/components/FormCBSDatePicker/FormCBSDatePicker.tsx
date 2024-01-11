import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { useGetEndOfDayDateDataQuery } from '@coop/cbs/data-access';

import FormDatePicker, {
  IFormDatePickerProps,
} from '../../controllers/FormDatePicker/FormDatePicker';

// interface IFormDatePickerProps<T> extends InputProps {
//   name: Path<T> | string;
//   label?: string;
//   rules?: UseControllerProps['rules'];
//   maxDate?: Date;
//   minDate?: Date;
//   maxToday?: boolean;
//   isRequired?: boolean;
//   helperText?: string;
//   baseDate?: Date;
// }

interface IFormCBSDatePickerProps extends IFormDatePickerProps {
  setInitialDate?: boolean;
}

export const FormCBSDatePicker = ({
  maxToday,
  maxDate,
  setInitialDate,
  ...rest
}: IFormCBSDatePickerProps) => {
  const { watch, setValue } = useFormContext();

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();

  const transactionDate = useMemo(
    () => endOfDayData?.transaction?.endOfDayDate?.value,
    [endOfDayData]
  );

  const dateField = watch(rest.name);

  useEffect(() => {
    if (setInitialDate && !dateField) {
      setValue(rest.name, transactionDate);
    }
  }, [rest.name, transactionDate, dateField]);

  return (
    <FormDatePicker
      baseDate={transactionDate?.en ? new Date(transactionDate.en) : new Date()}
      maxDate={maxToday ? new Date(transactionDate?.en as string) : maxDate}
      {...rest}
    />
  );
};
