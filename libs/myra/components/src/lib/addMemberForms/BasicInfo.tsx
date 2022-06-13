import { Grid } from '@coop/shared/ui';

import { DataSchema } from '../form/Form';
import { FormGenerator } from '../form/FormGenerator';

export const BasicInfo = () => {
  type Fields = {
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    dateOfBirthBs: string;
    dateOfBirthAd: string;
    nationality: string;
    educationalQualification: string;
    religion: string;
    vehicleColor: string;
  };
  const dataSchema: DataSchema<Fields>[] = [
    {
      variant: 'input',
      name: 'firstName',
      label: 'First Name',
      validations: { required: 'This is required' },
      placeholder: 'Enter First Name',
    },
    {
      variant: 'input',
      name: 'middleName',
      label: 'Middle Name',
      placeholder: 'Enter Middle Name',
    },
    {
      variant: 'input',
      name: 'lastName',
      label: 'Last Name',
      validations: { required: 'This is required' },
      placeholder: 'Enter Last Name',
    },
    {
      variant: 'select',
      name: 'gender',
      label: 'Gender',
      validations: { required: 'This is required' },
      placeholder: 'Enter gender',
      options: [
        { label: 'male', value: 'male' },
        { label: 'female', value: 'female' },
      ],
    },
    {
      variant: 'input',
      name: 'dateOfBirthBs',
      label: 'Date of Birth(BS)',
      placeholder: 'Enter Date of Birth in BS',
    },
    {
      variant: 'input',
      name: 'dateOfBirthAd',
      label: 'Date of Birth(AD)',
      placeholder: 'Enter Date of Birth in AD',
    },
    {
      variant: 'input',
      name: 'nationality',
      label: 'Nationality',
      placeholder: 'Enter nationality',
    },
    {
      variant: 'select',
      name: 'educationalQualification',
      label: 'Educational Qualification',
      placeholder: 'Enter Education Qualification',
      options: [
        { label: 'slc', value: 'slc' },
        { label: '+2', value: '+2' },
        { label: 'graduate', value: 'graduate' },
      ],
    },
    {
      variant: 'select',
      name: 'religion',
      label: 'Religion',
      placeholder: 'Enter Religion',
      options: [
        { label: 'hindu', value: 'hindu' },
        { label: 'buddhist', value: 'buddhist' },
      ],
    },
    {
      variant: 'input',
      name: 'vehicleColor',
      label: 'Vehicle Color',
      placeholder: 'Enter Vehicle color',
    },
  ];

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
      <FormGenerator dataSchema={dataSchema} />
    </Grid>
  );
};
