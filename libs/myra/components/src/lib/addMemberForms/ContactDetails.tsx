import { Grid } from '@coop/myra/ui';

import { DataSchema } from '../form/Form';
import { FormGenerator } from '../form/FormGenerator';

export const ContactDetails = () => {
  type Fields = {
    mobileNo: string;
    phoneNo: string;
    email: string;
  };
  const dataSchema: DataSchema<Fields>[] = [
    {
      variant: 'input',
      name: 'mobileNo',
      label: 'Mobile No',
      placeholder: 'Enter Mobile no',
    },
    {
      variant: 'input',
      name: 'phoneNo',
      label: 'Phone No',
      placeholder: 'Enter phone no',
    },
    {
      variant: 'input',
      name: 'email',
      label: 'Email',
      placeholder: 'Enter email address',
    },
  ];

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
      <FormGenerator dataSchema={dataSchema} />
    </Grid>
  );
};
