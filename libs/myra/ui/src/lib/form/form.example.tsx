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

  // const { getValues } = methods;
  // const debounced = debounce(() => console.log(getValues()));

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
      onChange: () => {
        //debounced
        console.log('input here');
      },
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
      <FormGenerator
        dataSchema={dataSchema}
        onEachFieldChange={() => {
          // debounced();
        }}
      />
      <Button type="submit">submit</Button>
    </Form>
  );
};
