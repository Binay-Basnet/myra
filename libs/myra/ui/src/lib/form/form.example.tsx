import { Button, Flex } from '@chakra-ui/react';
import { DataSchema, Dependencies, FormGenerator, Form } from '@saccos/myra/ui';
import { useForm } from 'react-hook-form';

type IFormValues = {
  firstName: string;
  lastName: string;
  username: number;
};

export const Example = () => {
  const methods = useForm<IFormValues>();
  const { getValues } = methods;
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
      validations: { required: 'required' },
    },
    {
      label: 'Last Name',
      name: 'lastName',
      validations: { required: 'This is required', deps: ['firstName'] },
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
        alert('submit');
        console.log('data', data);
      }}
      onChange={() => getValues()}
    >
      <Flex>
        <FormGenerator
          dataSchema={dataSchema}
          dependencies={dependencies}
          // layout
        />
      </Flex>
      <Button type="submit">submit</Button>
    </Form>
  );
};

export default Example;
