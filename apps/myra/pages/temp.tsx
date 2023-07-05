import { DatePicker } from '@myra-ui/date-picker';

const JobApplicationAdd = () => (
  <DatePicker calendarType="BS" minDate={new Date('2023-07-04')} maxDate={new Date('2023-07-05')} />
);

export default JobApplicationAdd;
