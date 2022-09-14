import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { DatePicker } from 'react-patro';

import { InputGroupContainer } from '@coop/cbs/transactions/ui-containers';
import { FormDatePicker } from '@coop/shared/form';
import { Box, Button } from '@coop/shared/ui';

export const Temp = () => {
  const [calendarFormat, setCalendarFormat] = useState<string>('BS');

  const methods = useForm();

  // const { watch } = methods;

  // const date = watch('date');

  // console.log({ date });

  return (
    <>
      <Box width="250px" m="200px">
        <Button onClick={() => setCalendarFormat('BS')}>Set BS</Button>

        <Button onClick={() => setCalendarFormat('AD')}>Set AD</Button>

        <DatePicker
          // defaultValue="2021-07-09"
          // showExtra={true}
          calendarType={calendarFormat}
          key={calendarFormat}
          dateFormat="yyyy-mm-dd"
          // value={selectedDate}
          // disablePast
          // showMonthDropdown={true}
          // showMonthDropdown={true}
          // showYearDropdown={true}
          // maxDate="2021-07-10"
          // minDate="07-03-2021"
          // disablePast
          // disableDate={(date) => date === "07-03-2021"}
          // onSelect={(formattedDate, adDate, bsDate, date) => {
          //   // setSelectedDate(formattedDate);
          //   console.log({ formattedDate, adDate, bsDate, date });
          // }}
          // onChange={(formattedDate, adDate, bsDate, date) => {
          //   //   console.log('val', val);
          //   console.log({
          //     formattedDate,
          //     adDate,
          //     bsDate,
          //     date,
          //     foramt: format(date, 'MM/dd/yyyy'),
          //   });
          //   //   setDateBS(val);
          // }}
        />
      </Box>
      <FormProvider {...methods}>
        <form>
          <InputGroupContainer>
            <FormDatePicker name="date" label="Date of Birth" />
          </InputGroupContainer>
        </form>
      </FormProvider>
    </>
  );
};

export default Temp;
