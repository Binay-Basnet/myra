// import { useState } from 'react';
// import { Box } from '@myra-ui';
// import { DatePicker } from '@myra-ui/date-picker';
//
// export const Temp = () => {
//   const [value, setValue] = useState<any>();
//
//   // const { control, watch, setValue: fSetValue } = useForm();
//   //
//   // console.log(watch('date'));
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
//       {/* <button */}
//       {/*   onClick={() => { */}
//       {/*     setValue({ date: new Date() }); */}
//       {/*     fSetValue('date', { date: new Date() }); */}
//       {/*   }} */}
//       {/* > */}
//       {/*   Select */}
//       {/* </button> */}
//       <DatePicker value={value} onChange={(newDate) => setValue(newDate)} calendarType="AD" />
//
//       {/* <FormDatePicker control={control} name="date" /> */}
//       {/* <RangedDatePicker /> */}
//     </Box>
//   );
// };
//
// // const FormDatePicker = ({ name, control }: { name: string; control: any }) => (
// //   <Controller
// //     control={control}
// //     render={({ field: { onChange, value } }) => <DatePicker onChange={onChange} value={value} />}
// //     name={name}
// //   />
// // );
//
// export default Temp;

import { RangedDatePicker } from '@myra-ui/date-picker';
import { Box } from '@myra-ui/foundations';

const Temp = () => (
  <Box display="flex" h="100vh" alignItems="center" justifyContent="center">
    <RangedDatePicker
      value={undefined}
      onChange={(newDate) => console.log(newDate)}
      tillDateStart={new Date('2018-10-10')}
      calendarType="AD"
      label="helo"
    />{' '}
  </Box>
);

export default Temp;
