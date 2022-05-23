import { Button } from '@chakra-ui/react';
import Form, { DataSchema } from './Form';
import { FormGenerator } from './FormGenerator';
import { useForm } from 'react-hook-form';

type IFormValues = {
  firstName: string;
  lastName: string;
  username: string;
};

export const Example = () => {
  const methods = useForm<IFormValues>();

  const { getValues } = methods;
  const onChange = () => console.log('value', getValues());

  const dataSchema: DataSchema[] = [
    {
      label: 'First Name',
      name: 'firstName',
      type: 'input',
      padding: 100,
    },
    {
      label: 'Last Name',
      name: 'lastName',
      validations: { required: 'This is required' },
      type: 'input',
    },
    {
      label: 'User Name',
      name: 'username',
      validations: { required: 'This is required' },
      type: 'input',
    },
  ];

  return (
    <Form<IFormValues>
      methods={methods}
      onSubmit={(data) => {
        console.log('data', data);
      }}
    >
      <FormGenerator dataSchema={dataSchema} onEachFieldChange={onChange} />
      <Button type="submit">submit</Button>
    </Form>
  );
};
