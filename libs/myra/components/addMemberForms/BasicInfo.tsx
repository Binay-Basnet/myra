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
      options: [
        { label: 'male', value: 'male' },
        { label: 'female', value: 'female' },
      ],
    },
    {
      type: 'input',
      name: 'dateOfBirthBs',
      label: 'Date of Birth(BS)',
    },
    {
      type: 'input',
      name: 'dateOfBirthAd',
      label: 'Date of Birth(AD)',
    },
    {
      type: 'input',
      name: 'nationality',
      label: 'Nationality',
    },
    {
      type: 'input',
      name: 'educationalQualification',
      label: 'Educational Qualification',
    },
    {
      type: 'input',
      name: 'religion',
      label: 'Religion',
    },
    {
      type: 'input',
      name: 'vehicleColor',
      label: 'Vehicle Color',
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
