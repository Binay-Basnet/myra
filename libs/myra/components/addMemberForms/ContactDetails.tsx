import { DataSchema } from '../form/Form';
import { FormGenerator } from '../form/FormGenerator';
import { Grid } from '../../ui/src/lib/grid/Grid';

export const ContactDetails = ({ debounced }) => {
  const dataSchema: DataSchema[] = [
    {
      type: 'input',
      name: 'mobileNo',
      label: 'Mobile No',
      placeholder: 'Enter Mobile no',
    },
    {
      type: 'input',
      name: 'phoneNo',
      label: 'Phone No',
      placeholder: 'Enter phone no',
    },
    {
      type: 'input',
      name: 'email',
      label: 'Email',
      placeholder: 'Enter email address',
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
