import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import { useRouter } from 'next/router';

// import debounce from 'lodash/debounce';
import {
  ContainerWithDivider,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  FormCheckboxGroup,
  FormInput,
  FormSelect,
  FormSwitch,
  FormSwitchTab,
} from '@coop/shared/form';
import {
  Box,
  Container,
  Grid,
  GridItem,
  IconButton,
  Text,
} from '@coop/shared/ui';

const typesOfMember = [
  { label: 'Individual', value: 'individual' },
  { label: 'Institiutional', value: 'institiutional' },
  { label: 'Cooperative', value: 'cooperative' },
  { label: 'Cooperative Union', value: 'cooperativeUnion' },
];

// /* eslint-disable-next-line */
// export interface SettingsDepositProductsAddProps {}

// const options = [
//   { label: 'fixed', value: 'fixed' },
//   { label: 'current', value: 'current' },
// ];
// const checkboxlist = [
//   { label: 'Male', value: 'male' },
//   { label: 'Female', value: 'Female' },
//   { label: 'Other', value: 'other' },
// ];

// const DepositFrequencyOptions = [
//   {
//     label: 'Daily',
//     value: 'Daily',
//   },
//   {
//     label: 'Weekly',
//     value: 'Weekly',
//   },
//   {
//     label: 'Monthly',
//     value: 'Monthly',
//   },
//   {
//     label: 'Yearly',
//     value: 'Yearly',
//   },
// ];
// const Days = [
//   {
//     label: 'Sunday',
//     value: 'Sunday',
//   },
//   {
//     label: 'Monday',
//     value: 'Monday',
//   },
//   {
//     label: 'Tuesday',
//     value: 'Tuesday',
//   },
//   {
//     label: 'Wednesday',
//     value: 'Wednesday',
//   },
//   {
//     label: 'Thrusday',
//     value: 'Thrusday',
//   },
//   {
//     label: 'Friday',
//     value: 'Friday',
//   },
// ];
// const anyDay = [{ label: 'Any Day', value: 'anyDay' }];
// const daysforMonth = [
//   { label: 'Day', value: 'day' },
//   { label: 'Day of the Week', value: 'dayOfWeek' },
// ];

export const TypesOfMember = ({ watch }: any) => {
  const see = watch('typeOfMember');
  console.log('see', see);
  return (
    <Box display="flex" flexDirection={'column'} gap="s16">
      <Text fontWeight="500" fontSize={'s3'} color="gray.700">
        Type of member
      </Text>

      <FormCheckboxGroup
        name="typeOfMember"
        list={typesOfMember}
        orientation="column"
      />
    </Box>
  );
};
