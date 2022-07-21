import React from 'react';

// import debounce from 'lodash/debounce';
import { FormCheckboxGroup } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

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
  const { t } = useTranslation();
  return (
    <Box display="flex" flexDirection={'column'} gap="s16">
      <Text fontWeight="500" fontSize={'s3'} color="gray.700">
        {t['loanProductMemberCategory']}
      </Text>

      <FormCheckboxGroup
        name="typeOfMember"
        list={typesOfMember}
        orientation="column"
      />
    </Box>
  );
};
