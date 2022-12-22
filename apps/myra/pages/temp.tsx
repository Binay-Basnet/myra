// import { useState } from 'react';
// import { Controller, useForm } from 'react-hook-form';
//
// import { Box } from '@myra-ui';
// import { DatePicker } from '@myra-ui/date-picker';
//
// export const Temp = () => {
//   const [value, setValue] = useState<any>();
//
//   const { control, watch, setValue: fSetValue } = useForm();
//
//   console.log(watch('date'));
//
//   return (
//     <Box
//       minH="100vh"
//       display="flex"
//       flexDir="column"
//       gap="s20"
//       alignItems="center"
//       justifyContent="center"
//     >
//       <button
//         onClick={() => {
//           setValue({ date: new Date() });
//           fSetValue('date', { ad: '2022-10-11' });
//         }}
//       >
//         Select
//       </button>
//       {/* <DatePicker locale="en" value={value} onChange={(newDate) => setValue(newDate)} calendarType="AD" /> */}
//
//       <FormDatePicker control={control} name="date" />
//       {/* <RangedDatePicker /> */}
//     </Box>
//   );
// };
//
// const FormDatePicker = ({ name, control }: { name: string; control: any }) => (
//   <Controller
//     control={control}
//     render={({ field: { onChange, value } }) => (
//       <DatePicker onChange={onChange} value={value} locale="en" />
//     )}
//     name={name}
//   />
// );
//
// export default Temp;

import { useState } from 'react';

import { DatePicker, RangedDatePicker } from '@myra-ui/date-picker';
import { Box } from '@myra-ui/foundations';

type DateRange = {
  from: {
    date: Date;
    en: string;
    np: string;
  } | null;
  to: {
    date: Date;
    en: string;
    np: string;
  } | null;
};

const Temp = () => {
  const [bsDateNp, setBsDateNp] = useState<DateRange>();
  const [bsDateEn, setBsDateEn] = useState<DateRange>();
  const [adDateEn, setAdDateEn] = useState<DateRange>();
  const [adDateNp, setAdDateNp] = useState<DateRange>();

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        w="100vw"
        h="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w="100%"
          h="100%"
          bg="gray.200"
          borderRight="1px"
          borderBottom="1px"
          borderColor="border.element"
          p="s16"
        >
          <RangedDatePicker
            value={bsDateNp}
            tillDateStart={new Date('2018-10-10')}
            calendarType="BS"
            label="Date Picker BS - NP"
            locale="ne"
            onChange={(newDate) => setBsDateNp(newDate)}
          />
        </Box>
        <Box
          w="100%"
          p="s16"
          h="100%"
          bg="gray.200"
          borderBottom="1px"
          borderColor="border.element"
        >
          <RangedDatePicker
            value={bsDateEn}
            tillDateStart={new Date('2018-10-10')}
            calendarType="BS"
            label="Date Picker BS - EN"
            locale="en"
            onChange={(newDate) => setBsDateEn(newDate)}
          />
        </Box>

        <Box w="100%" h="100%" p="s16" borderRight="1px" borderColor="border.element" bg="gray.200">
          <RangedDatePicker
            value={adDateEn}
            tillDateStart={new Date('2018-10-10')}
            calendarType="AD"
            label="Date Picker AD - EN"
            locale="en"
            onChange={(newDate) => setAdDateEn(newDate)}
          />
        </Box>
        <Box w="100%" h="100%" bg="gray.200" p="s16">
          <RangedDatePicker
            value={adDateNp}
            tillDateStart={new Date('2018-10-10')}
            calendarType="AD"
            label="Date Picker AD - NP"
            locale="ne"
            onChange={(newDate) => setAdDateNp(newDate)}
          />
        </Box>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        w="100vw"
        h="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w="100%"
          h="100%"
          bg="gray.200"
          borderRight="1px"
          borderBottom="1px"
          borderColor="border.element"
          p="s16"
        >
          <DatePicker label="Date Picker - AD - EN" locale="en" calendarType="AD" />
        </Box>
        <Box
          w="100%"
          p="s16"
          h="100%"
          bg="gray.200"
          borderBottom="1px"
          borderColor="border.element"
        >
          <DatePicker label="Date Picker - AD - NE" locale="ne" calendarType="AD" />
        </Box>

        <Box w="100%" h="100%" p="s16" borderRight="1px" borderColor="border.element" bg="gray.200">
          <DatePicker label="Date Picker - BS - EN" locale="en" calendarType="BS" />
        </Box>
        <Box w="100%" h="100%" bg="gray.200" p="s16">
          <DatePicker label="Date Picker - BS - NE" locale="ne" calendarType="BS" />
        </Box>
      </Box>
    </>
  );
};

export default Temp;
