import { DataSchema } from '../form/Form';
import { FormGenerator } from '../form/FormGenerator';
import { Grid } from '../../ui/src/lib/grid/Grid';

export const BasicInfo = ({ debounced }) => {
  const dataSchema: DataSchema[] = [
    {
      type: 'input',
      name: 'firstName',
      label: 'First Name',
      validations: { required: 'This is required' },
      placeholder: 'Enter First Name',
    },
    {
      type: 'input',
      name: 'middleName',
      label: 'Middle Name',
      placeholder: 'Enter Middle Name',
    },
    {
      type: 'input',
      name: 'lastName',
      label: 'Last Name',
      validations: { required: 'This is required' },
      placeholder: 'Enter Last Name',
    },
    {
      type: 'select',
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
      type: 'input',
      name: 'dateOfBirthBs',
      label: 'Date of Birth(BS)',
      placeholder: 'Enter Date of Birth in BS',
    },
    {
      type: 'input',
      name: 'dateOfBirthAd',
      label: 'Date of Birth(AD)',
      placeholder: 'Enter Date of Birth in AD',
    },
    {
      type: 'input',
      name: 'nationality',
      label: 'Nationality',
      placeholder: 'Enter nationality',
    },
    {
      type: 'select',
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
      type: 'select',
      name: 'religion',
      label: 'Religion',
      placeholder: 'Enter Religion',
      options: [
        { label: 'hindu', value: 'hindu' },
        { label: 'buddhist', value: 'buddhist' },
      ],
    },
    {
      type: 'input',
      name: 'vehicleColor',
      label: 'Vehicle Color',
      placeholder: 'Enter Vehicle color',
    },
  ];

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
      <FormGenerator
        dataSchema={dataSchema}
        onEachFieldChange={() => {
          debounced();
        }}
      />
    </Grid>
  );
};
