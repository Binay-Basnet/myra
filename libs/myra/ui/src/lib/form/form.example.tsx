import { Button, Flex } from '@chakra-ui/react';
import Form, { DataSchema, Dependencies } from './Form';
import { FormGenerator } from './FormGenerator';
import { useForm } from 'react-hook-form';

type IFormValues = {
  firstName: string;
  lastName: string;
  username: number;
};

export const Example = () => {
  const methods = useForm<IFormValues>();
  interface FieldTypes {
    lastName: 'input';
    username: 'input';
    gender: 'input';
    contact: 'input';
    firstName: 'select';
    district: 'input';
    province: 'input';
  }

  const dataSchema: DataSchema<FieldTypes>[] = [
    {
      label: 'First Name',
      name: 'firstName',
      variant: 'input',
    },
    {
      label: 'Last Name',
      name: 'lastName',
      validations: { required: 'This is required' },
      variant: 'input',
    },
    {
      label: 'User Name',
      name: 'username',
      validations: { required: 'This is required' },
      variant: 'input',
    },
    {
      label: 'Gender',
      name: 'gender',
      validations: { required: 'This is required' },
      variant: 'input',
    },
    {
      label: 'Contact Number',
      name: 'contact',
      variant: 'input',
    },
    {
      label: 'District',
      name: 'district',
      variant: 'input',
    },
    {
      label: 'Province',
      name: 'province',
      variant: 'input',
    },
  ];

  const dependencies: Dependencies<FieldTypes> = {
    lastName: {
      keys: ['gender'],
      conditions: (valueOf) => {
        if (!valueOf) return null;
        if (valueOf['gender'] === 'female') {
          return {
            label: 'what the fuck ',
            bg: 'green',
          };
        }
        return null;
      },
    },

    district: {
      keys: ['province'],
      conditions: (valueOf) => {
        if (!valueOf) return null;
        if (valueOf['province'] === 'what') {
          return {
            label: 'province aayo',
          };
        }

        return null;
      },
    },
  };

  return (
    <Form<IFormValues>
      methods={methods}
      onSubmit={(data) => {
        console.log('data', data);
      }}
    >
      <Flex>
        <FormGenerator
          dataSchema={dataSchema}
          dependencies={dependencies}
          // layout

          // onMount
          onEachFieldChange={() => {
            // debounced();
          }}
        />
      </Flex>
      <Button type="submit">submit</Button>
    </Form>
  );
};
