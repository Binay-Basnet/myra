import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { DatePicker } from '@raralabs/react-patro';

import { InputGroupContainer } from '@coop/cbs/transactions/ui-containers';
import { FormDatePicker } from '@coop/shared/form';
import { Table } from '@coop/shared/table';
import { Box, Button } from '@myra-ui';

type TableType = {
  id: number;
  name: string;
  age: number;
  phoneNo: number;
};

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

      <Table<TableType>
        data={[{ id: 1, name: 'John Doe', age: 20, phoneNo: 9840123456 }]}
        columns={[
          { accessorKey: 'id', accessorFn: (row) => row.id, enableSorting: true },
          { accessorKey: 'name', accessorFn: (row) => row.name },
        ]}
      />

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
