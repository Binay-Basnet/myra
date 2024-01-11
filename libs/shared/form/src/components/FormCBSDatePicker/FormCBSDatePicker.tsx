import { useMemo } from 'react';

import { useGetEndOfDayDateDataQuery } from '@coop/cbs/data-access';

import FormDatePicker, {
  IFormDatePickerProps,
} from '../../controllers/FormDatePicker/FormDatePicker';

export const FormCBSDatePicker = <T,>({ maxToday, maxDate, ...rest }: IFormDatePickerProps<T>) => {
  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();

  const transactionDate = useMemo(
    () => endOfDayData?.transaction?.endOfDayDate?.value,
    [endOfDayData]
  );

  return (
    <FormDatePicker
      baseDate={transactionDate?.en ? new Date(transactionDate.en) : new Date()}
      maxDate={maxToday ? new Date(transactionDate?.en as string) : maxDate}
      {...rest}
    />
  );
};
