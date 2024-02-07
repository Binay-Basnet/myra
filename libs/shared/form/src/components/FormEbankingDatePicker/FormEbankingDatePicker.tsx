import { useAppSelector } from '@coop/ebanking/data-access';

import FormDatePicker, {
  IFormDatePickerProps,
} from '../../controllers/FormDatePicker/FormDatePicker';

export const FormEbankingDatePicker = (props: IFormDatePickerProps) => {
  const user = useAppSelector((state) => state?.auth?.user);

  return <FormDatePicker calendarType={user?.preference?.date as 'AD' | 'BS'} {...props} />;
};
